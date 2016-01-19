/* jshint esnext: true */
import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

class UserProfileActions {
  constructor() {
    this.generateActions(
      'getUserProfileSuccess',
      'getUserProfileFail'
    );
  }

  getUserProfile() {
    UserWebAPIUtils.getProfile()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getUserProfileSuccess(response);
        } else {
          this.actions.getUserProfileFail(response);
        }
      });
  }
}

export default alt.createActions(UserProfileActions);
