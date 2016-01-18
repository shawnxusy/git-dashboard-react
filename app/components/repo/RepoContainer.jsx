/* jshint esnext:true */

import React from 'react';
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
      <div>
        <h3 className="text-center">This is showing a single repo!</h3>
        <div>
          {this.state.repo.id} - {this.state.repo.name}
        </div>
        <div>
          <h4 className="text-center">A list of repo branches</h4>
          <a onClick={this.toggleCreateBranch}>Create new branch</a>
          <div className={this.state.createBranch ? '' : 'no-display'}>
            <CreateBranch newBranch={this.state.newBranch} isDone={this.toggleCreateBranch} branches={this.state.branches} repoName={this.state.repo.name} />
          </div>
          <RepoBranchList branches={this.state.branches} repoName={this.state.repo.name}/>
        </div>
        <div>
          <h4 className="text-center">A list of repo issues</h4>
          <a onClick={this.toggleCreateIssue}>Create new issue</a>
          <div className={this.state.createIssue ? '' : 'no-display'}>
            <CreateIssue newIssue={this.state.newIssue} isDone={this.toggleCreateIssue} issues={this.state.issues} repoName={this.state.repo.name} />
          </div>
          <RepoIssueList issues={this.state.issues} repoName={this.state.repo.name} />
        </div>
      </div>
    );
  }
}
