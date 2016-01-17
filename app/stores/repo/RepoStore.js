/* jshint esnext:true */

import alt from 'altInstance';
import _ from 'lodash';
import RepoActions from 'actions/repo/RepoActions';

class RepoStore {
  constructor() {
    this.bindActions(RepoActions);
    this.repo = {};
    this.branches = [];
    this.issues = [];
  }

  static displayName = 'RepoStore';

  onGetRepoSuccess(data) {
    this.repo = data;
  }

  onGetRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onGetBranchesSuccess(data) {
    this.branches = data;
    _.each(this.branches, (branch) => {
      branch.taskBox = false;
    })
  }

  onGetBranchesFail(errorMessage) {
    console.log(errorMessage);
  }

  onGetIssuesSuccess(data) {
    this.issues = data;
  }

  onGetIssuesFail(errorMessage) {
    console.log(errorMessage);
  }

  onToggleCreateTask(sha) {
    let targetBranch = _.find(this.branches, function(branch) {
      return branch.commit.sha === sha;
    })
    targetBranch.taskBox = !targetBranch.taskBox;
  }

}

export default alt.createStore(RepoStore);
