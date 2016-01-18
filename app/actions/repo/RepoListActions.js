/* jshint esnext: true */
import alt from 'altInstance';
import RepoWebAPIUtils from 'utils/RepoWebAPIUtils';

class RepoListActions {
  constructor() {
    this.generateActions(
      'getReposSuccess',
      'getReposFail',
      'createRepoSuccess',
      'createRepoFail',
      'updateName',
      'updateDescription',
      'updateHomepage',
      'updatePrivacy',
      'toggleCreateRepo'
    );
  }

  getRepos() {
    RepoWebAPIUtils.getRepos()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getReposSuccess(response);
        } else {
          this.actions.getReposFail(response);
        }
      });
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

export default alt.createActions(RepoListActions);
