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

  render() {
    return (
      <div>
        <h3 className="text-center">This is showing a single repo!</h3>
        <div>
          {this.state.repo.id} - {this.state.repo.name}
        </div>
        <div>
          <h4 className="text-center">A list of repo branches</h4>
          <CreateBranch newBranch={this.state.newBranch} />
          <RepoBranchList branches={this.state.branches} />
        </div>
        <div>
          <h4 className="text-center">A list of repo issues</h4>
          <RepoIssueList issues={this.state.issues} />
        </div>
      </div>
    );
  }
}
