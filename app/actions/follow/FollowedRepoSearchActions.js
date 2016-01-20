/* jshint esnext:true */

import alt from 'altInstance';

import FollowWebAPIUtils from 'utils/FollowWebAPIUtils';

class FollowedRepoSearchActions {
  constructor() {
    this.generateActions(
      'searchRepoSuccess',
      'searchRepoFail',
      'searchStart',
      'searchEnd',
      'followRepoSuccess',
      'followRepoFail',
      'clearSearch'
    );
  }

  search(searchText) {
    this.actions.searchStart();
    FollowWebAPIUtils.searchRepo(searchText)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.searchRepoSuccess(response.items);
        } else {
          this.actions.searchRepoFail(response);
        }
    });
  }

  addFollow(owner, name) {
    FollowWebAPIUtils.addFollow(owner, name)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.followRepoSuccess(response);
        } else {
          this.actions.followRepoFail(response);
        }
      });
  }

  clearSearch() {
    this.actions.clearSearch();
  }
}

module.exports = alt.createActions(FollowedRepoSearchActions);
