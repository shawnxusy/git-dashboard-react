/* jshint esnext:true */

import alt from 'altInstance';
import UserProfileActions from 'actions/user/UserProfileActions';

class UserProfileStore {
  constructor() {
    this.bindActions(UserProfileActions);
    this.userProfile = {};
  }

  static displayName = 'UserProfileStore';

  onGetUserProfileSuccess(data) {
    this.userProfile = data;
  }

  onGetUserProfileFail(errorMessage) {
    console.log(errorMessage);
  }
}

export default alt.createStore(UserProfileStore);
