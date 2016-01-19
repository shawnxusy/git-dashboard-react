/* jshint esnext:true */

import alt from 'altInstance';

import FollowWebAPIUtils from 'utils/FollowWebAPIUtils';

class FollowedRepoSearchActions {
  constructor() {
    this.generateActions(
      'searchRepoSuccess',
      'searchRepoFail'
    );
  }

  search(searchText) {
    FollowWebAPIUtils.searchRepo(searchText)
      .then((response, textStatus) => {
        console.log(response);
        if (textStatus === 'success') {
          this.actions.searchRepoSuccess(response.items);
        } else {
          this.actions.searchRepoFail(response);
        }
    });
  }
}

module.exports = alt.createActions(FollowedRepoSearchActions);
