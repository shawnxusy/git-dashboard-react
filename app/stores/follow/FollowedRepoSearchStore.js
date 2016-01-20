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

  onSearchRepoSuccess(data) {
    this.loading = false;
    this.repos = data.slice(0, 10); //only display top 10
  }

  onSearchRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onSearchStart() {
    this.loading = true
  }

  onFollowRepoSuccess(data) {

  }

  onFollowRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onClearSearch() {
    this.repos = [];
  }
}

export default alt.createStore(FollowedRepoSearchStore);
