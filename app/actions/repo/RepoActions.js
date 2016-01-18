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
      'createBranchSuccess',
      'createBranchFail',
      'getIssuesSuccess',
      'getIssuesFail',
      'createIssueSuccess',
      'createIssueFail',
      'toggleCreateTask',
      'toggleCreateBranch',
      'toggleCreateIssue',
      'updateBranchName',
      'updateBranchFrom',
      'updateIssueBody',
      'updateIssueTitle'
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

  createBranch(name, branchFrom, repoName) {
    RepoWebAPIUtils.createBranch(name, branchFrom, repoName)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.createBranchSuccess(response);
        } else {
          this.actions.createBranchFail(response);
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

  createIssue(title, body, repoName) {
    RepoWebAPIUtils.createIssue(title, body, repoName)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.createIssueSuccess(response);
        } else {
          this.actions.createIssueFail(response);
        }
      });
  }
}

export default alt.createActions(RepoActions);
