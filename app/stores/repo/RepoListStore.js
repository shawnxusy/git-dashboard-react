/* jshint esnext:true */

import alt from 'altInstance';
import RepoListActions from 'actions/repo/RepoListActions';

class RepoListStore {
  constructor() {
    this.bindActions(RepoListActions);
    this.repos = [];
  }

  static displayName = 'RepoListStore';

  onGetReposSuccess(data) {
    console.log("RepoListStore.js, current repos is: ", data);
    this.repos = data;
  }

  onGetReposFail(errorMessage) {
    console.log(errorMessage);
  }
}

export default alt.createStore(RepoListStore);
