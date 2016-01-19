/* jshint esnext:true */

import alt from 'altInstance';
import FollowedRepoSearchActions from 'actions/follow/FollowedRepoSearchActions';

class FollowedRepoSearchStore {
  constructor() {
    this.bindActions(FollowedRepoSearchActions);
    this.repos = [];
    this.loading = false;
  }

  static displayName = 'FollowedRepoSearchStore';

  onSearch() {
    this.loading = true;
  }

  onSearchRepoSuccess(data) {
    this.loading = false;
    this.repos = data;
  }

  onSearchRepoFail(errorMessage) {
    console.log(errorMessage);
  }
}

export default alt.createStore(FollowedRepoSearchStore);
