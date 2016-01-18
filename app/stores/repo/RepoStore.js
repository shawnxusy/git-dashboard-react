/* jshint esnext:true */

import alt from 'altInstance';
import _ from 'lodash';
import RepoActions from 'actions/repo/RepoActions';

class RepoStore {
  constructor() {
    this.bindActions(RepoActions);
    this.repo = {};
    this.branches = [];
    this.issues = [];
    this.newBranch = {
      name: "",
      branchFrom: ""
    };
    this.createBranch = false;
  }

  static displayName = 'RepoStore';

  onGetRepoSuccess(data) {
    this.repo = data;
  }

  onGetRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onGetBranchesSuccess(data) {
    this.branches = data;
    _.each(this.branches, (branch) => {
      branch.taskBox = false;
    });
    _.each(this.issues, (issue) => {
      issue.taskBox = false;
    })
  }

  onGetBranchesFail(errorMessage) {
    console.log(errorMessage);
  }

  onGetIssuesSuccess(data) {
    this.issues = data;
  }

  onGetIssuesFail(errorMessage) {
    console.log(errorMessage);
  }

  onUpdateName(event) {
    this.newBranch.name = event.target.value;
  }

  onUpdateBranchFrom(event) {
    this.newBranch.branchFrom = event.target.value;
  }

  onToggleCreateBranch() {
    this.createBranch = !this.createBranch;
  }

  onToggleCreateTask(data) {
    // Get the branch and toggle its taskBox
    if (data.type === "branch") {
      let targetBranch = _.find(this.branches, function(branch) {
        return branch.commit.sha === data.id;
      })
      targetBranch.taskBox = !targetBranch.taskBox;
    } else {
      // type === "issue"
      let targetIssue = _.find(this.issues, function(issue) {
        return issue.id === data.id;
      })
      targetIssue.taskBox = !targetIssue.taskBox;
    }
  }

}

export default alt.createStore(RepoStore);
