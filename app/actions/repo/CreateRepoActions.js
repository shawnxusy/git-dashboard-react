/* jshint esnext:true */
import alt from 'altInstance';
import RepoWebAPIUtils from 'utils/RepoWebAPIUtils';

class CreateRepoActions {
  constructor() {
    this.generateActions(
      'createRepoSuccess',
      'creategetRepoFail',
      'updateName',
      'updateDescription',
      'updateHomepage',
      'updatePrivacy',
      'invalidName',
      'invalidDescription'
    );
  }

  createRepo(name, description, homepage, privacy) {
    let isPrivate = (privacy === 'public') ? false : true;
    RepoWebAPIUtils.createRepo(name, description, homepage, isPrivate)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.createRepoSuccess(response);
        } else {
          this.actions.createRepoFail(response);
        }
      });
  }

}

export default alt.createActions(CreateRepoActions);
