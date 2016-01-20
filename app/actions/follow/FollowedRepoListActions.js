/* jshint esnext:true */

import alt from 'altInstance';

import FollowWebAPIUtils from 'utils/FollowWebAPIUtils';

class FollowedRepoListActions {
  constructor() {
    this.generateActions(
      'getFollowedReposSuccess',
      'getFollowedReposFail'
    );
  }

  getFollowedRepos() {
    FollowWebAPIUtils.getFollowedRepos()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getFollowedReposSuccess(response);
        } else {
          this.actions.getFollowedReposFail(response);
        }
      });
  }
}

module.exports = alt.createActions(FollowedRepoListActions);
