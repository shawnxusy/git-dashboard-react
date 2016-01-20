/* jshint esnext:true */

import alt from 'altInstance';
import FollowedRepoActions from 'actions/follow/FollowedRepoActions';

class FollowedRepoStore {
  constructor() {
    this.bindActions(FollowedRepoActions);
    this.followedRepos = [];
  }

  static displayName = 'FollowedRepoStore';

  onGetFollowedReposSuccess(data) {
    this.followedRepos = data;
  }

  onGetFollowedReposFail(errorMessage) {
    console.log(errorMessage);
  }
}

export default alt.createStore(FollowedRepoStore);
