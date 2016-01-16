/* jshint esnext:true */
import alt from '../../altInstance';
import RepoWebAPIUtils from 'utils/RepoWebAPIUtils';

class RepoActions {
  constructor() {
    this.generateActions(
      'getRepoSuccess',
      'getRepoFail'
    );
  }

  getRepo(repoName) {
    RepoWebAPIUtils.getRepo(repoName)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getRepoSuccess(response);
        } else {
          this.actions.getRepoFail(response);
        }
      });
  }

}

export default alt.createActions(RepoActions);
