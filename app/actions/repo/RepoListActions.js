/* jshint esnext: true */
import alt from '../../altInstance';
import RepoWebAPIUtils from 'utils/RepoWebAPIUtils';

class RepoListActions {
  constructor() {
    this.generateActions(
      'getReposSuccess',
      'getReposFail'
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
}

export default alt.createActions(RepoListActions);
