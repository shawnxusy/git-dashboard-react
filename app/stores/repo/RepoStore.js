/* jshint esnext:true */

import alt from 'altInstance';
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
    console.log("Branches: ", data);
    this.branches = data;
  }

  onGetBranchesFail(errorMessage) {
    console.log(errorMessage);
  }

  onGetIssuesSuccess(data) {
    console.log("Issues: ", data);
    this.issues = data;
  }

  onGetIssuesFail(data) {
    console.log(errorMessage);
  }

}

export default alt.createStore(RepoStore);
