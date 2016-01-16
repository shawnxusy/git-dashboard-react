/* jshint esnext:true */

import alt from '../../altInstance';
import RepoActions from '../../actions/repo/RepoActions';

class RepoStore {
  constructor() {
    this.bindActions(RepoActions);
    this.repo = {};
  }

  static displayName = 'RepoStore';

  onGetRepoSuccess(data) {
    this.repo = data;
  }

  onGetRepoFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(RepoStore);
