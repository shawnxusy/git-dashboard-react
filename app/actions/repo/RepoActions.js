/* jshint esnext:true */
import alt from 'altInstance';
import RepoWebAPIUtils from 'utils/RepoWebAPIUtils';

class RepoActions {
  constructor() {
    this.generateActions(
      'getRepoSuccess',
      'getRepoFail',
      'getBranchesSuccess',
      'getBranchesFail',
      'getIssuesSuccess',
      'getIssuesFail',
      'toggleCreateTask'
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

  getBranches(repoName) {
    RepoWebAPIUtils.getBranches(repoName)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getBranchesSuccess(response);
        } else {
          this.actions.getBranchesFail(response);
        }
      });
  }

  getIssues(repoName) {
    RepoWebAPIUtils.getIssues(repoName)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getIssuesSuccess(response);
        } else {
          this.actions.getIssuesFail(response);
        }
      });
  }
}

export default alt.createActions(RepoActions);
