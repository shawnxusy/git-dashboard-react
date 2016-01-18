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

  onCreateBranchSuccess(newBranch) {
    // Need to convert received branch to our data branch data type
    let branch = {
      commit: {
        sha: newBranch.object.sha,
        url: newBranch.object.url
      },
      name: newBranch.ref.slice(11), // Remove 'refs/heads/' to get the branch name
      taskBox: false
    };

    this.branches.unshift(branch); // Optimistically bring it to the front

    // Refresh the input boxes
    this.newBranch.name = "";
    this.newBranch.branchFrom = "";
  };

  onCreateBranchFail(errorMessage) {
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
      this.branches[data.id].taskBox = !this.branches[data.id].taskBox;
    } else {
      // type === "issue"
      this.issues[data.id].taskBox = !this.issues[data.id].taskBox;
    }
  }

}

export default alt.createStore(RepoStore);
