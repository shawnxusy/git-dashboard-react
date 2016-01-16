/* jshint esnext:true */

import alt from '../../altInstance';
import RepoListActions from '../../actions/repo/RepoListActions';

class RepoListStore {
  constructor() {
    this.bindActions(RepoListActions);
    this.repos = [];
  }

  static displayName = 'RepoListStore';

  onGetReposSuccess(data) {
    this.repos = data;
  }

  onGetReposFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(RepoListStore);
