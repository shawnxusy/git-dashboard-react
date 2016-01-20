/* jshint esnext:true */

import React from 'react';
import { Link } from 'react-router';
import RepoStore from 'stores/repo/RepoStore';
import RepoActions from 'actions/repo/RepoActions';
import RepoBranchList from 'components/repo/RepoBranchList';
import CreateBranch from 'components/repo/CreateBranch';
import RepoIssueList from 'components/repo/RepoIssueList';
import CreateIssue from 'components/repo/CreateIssue';

export default class RepoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = RepoStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RepoStore.listen(this.onChange);
    RepoActions.getRepo(this.props.params.name);
    RepoActions.getBranches(this.props.params.name);
    RepoActions.getIssues(this.props.params.name);
  }

  componentWillUnmount() {
    if (this.state.createBranch) {
      this.toggleCreateBranch();
    }
    if (this.state.createIssue) {
      this.toggleCreateIssue();
    }
    RepoStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  toggleCreateBranch = () => {
    RepoActions.toggleCreateBranch();
  }

  toggleCreateIssue = () => {
    RepoActions.toggleCreateIssue();
  }

  render() {
    return (
      <div className="repos">
        <div className="row">
          <p className="title col-sm-8"><Link to="/">Public Repos</Link> / {this.state.repo.name}</p>
          <div className="links col-sm-4">
            <div to="/" className="toggle toggle-on">Repos</div>
            <Link to="/task" className="toggle">Tasks</Link>
          </div>
        </div>
        <div className="repo">
          <h4 className="text-center">Branches</h4>
          <a onClick={this.toggleCreateBranch} className="create-new-clicker center in-repo">
            <i className={this.state.createBranch ? 'fa fa-times' : 'fa fa-plus'}></i>
            {this.state.createBranch ? 'Cancel' : 'New Branch'}
          </a>
          <div className={this.state.createBranch ? '' : 'no-display'}>
            <CreateBranch newBranch={this.state.newBranch} isDone={this.toggleCreateBranch} branches={this.state.branches} repoName={this.state.repo.name} />
          </div>
          <RepoBranchList branches={this.state.branches} repoName={this.state.repo.name}/>
        </div>
        <div className="repo">
          <h4 className="text-center">Issues</h4>
          <a onClick={this.toggleCreateIssue} className="create-new-clicker center in-repo">
            <i className={this.state.createIssue ? 'fa fa-times' : 'fa fa-plus'}></i>
            {this.state.createIssue ? 'Cancel' : 'New Issue'}
          </a>
          <div className={this.state.createIssue ? '' : 'no-display'}>
            <CreateIssue newIssue={this.state.newIssue} isDone={this.toggleCreateIssue} issues={this.state.issues} repoName={this.state.repo.name} />
          </div>
          <RepoIssueList issues={this.state.issues} repoName={this.state.repo.name} />
        </div>
      </div>
    );
  }
}
