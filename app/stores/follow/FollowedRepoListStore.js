/* jshint esnext:true */

import alt from 'altInstance';
import FollowedRepoListActions from 'actions/follow/FollowedRepoListActions';

class FollowedRepoListStore {
  constructor() {
    this.bindActions(FollowedRepoListActions);
    this.followedRepos = [];
  }

  static displayName = 'FollowedRepoListStore';

  onGetFollowedReposSuccess(data) {
    this.followedRepos = data;
  }

  onGetFollowedReposFail(errorMessage) {
    console.log(errorMessage);
  }

}

export default alt.createStore(FollowedRepoListStore);
