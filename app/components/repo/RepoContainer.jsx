/* jshint esnext:true */

import React from 'react';
import RepoStore from 'stores/repo/RepoStore';
import RepoActions from 'actions/repo/RepoActions';
import RepoBranchList from 'components/repo/RepoBranchList';
import CreateBranch from 'components/repo/CreateBranch';
import RepoIssueList from 'components/repo/RepoIssueList';

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
    RepoStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  toggleCreateBranch = () => {
    RepoActions.toggleCreateBranch();
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
            <CreateBranch newBranch={this.state.newBranch} isDone={this.toggleCreateBranch} branches={this.state.branches} />
          </div>
          <RepoBranchList branches={this.state.branches} repoName={this.state.repo.name}/>
        </div>
        <div>
          <h4 className="text-center">A list of repo issues</h4>
          <RepoIssueList issues={this.state.issues} repoName={this.state.repo.name} />
        </div>
      </div>
    );
  }
}
