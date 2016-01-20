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
    this.bootstrapBranch();
    this.createBranch = false;
    this.bootstrapIssue();
    this.createIssue = false;
  }

  static displayName = 'RepoStore';

  bootstrapBranch() {
    this.newBranch = {
      name: "",
      branchFrom: "master"
    };
  }

  bootstrapIssue() {
    this.newIssue = {
      title: "",
      body: ""
    };
  }

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
      taskBox: false,
      newTask: {
        name: "",
        description: "",
        start: "",
        duration: ""
      }
    };

    this.branches.unshift(branch); // Optimistically bring it to the front

    // Refresh the input boxes
    this.bootstrapBranch();
  };

  onCreateBranchFail(errorMessage) {
    console.log(errorMessage);
  }

  bootstrapBranchTasks() {
    _.each(this.branches, (branch) => {
      branch.taskBox = false;
      branch.newTask = {
        name: "",
        description: "",
        start: "",
        duration: ""
      }
    });
  }

  onGetBranchesSuccess(data) {
    this.branches = data;
    this.bootstrapBranchTasks();
  }

  onGetBranchesFail(errorMessage) {
    console.log(errorMessage);
  }

  bootstrapIssueTasks() {
    _.each(this.issues, (issue) => {
      issue.taskBox = false;
      issue.newTask = {
        name: "",
        description: "",
        start: "",
        duration: ""
      }
    })
  }

  onGetIssuesSuccess(data) {
    this.issues = data;
    this.bootstrapIssueTasks();
  }

  onGetIssuesFail(errorMessage) {
    console.log(errorMessage);
  }

  onCreateIssueSuccess(issue) {
    issue.newTask = {
      name: "",
      description: "",
      start: "",
      duration: ""
    };
    issue.taskBox = false;
    this.issues.unshift(issue);

    // Refresh the input boxes
    this.bootstrapIssue();
  }

  onCreateIssueFail(errorMessage) {
    console.log(errorMessage);
  }

  onUpdateBranchName(event) {
    this.newBranch.name = event.target.value;
  }

  onUpdateBranchFrom(event) {
    this.newBranch.branchFrom = event.target.value;
  }

  onUpdateIssueTitle(event) {
    this.newIssue.title = event.target.value;
  }

  onUpdateIssueBody(event) {
    this.newIssue.body = event.target.value;
  }

  onUpdateTaskName(data) {
    if (data.type === "branch") {
      this.branches[data.id].newTask.name = data.value;
    } else {
      this.issues[data.id].newTask.name = data.value;
    }
  }

  onUpdateTaskDescription(data) {
    if (data.type === "branch") {
      this.branches[data.id].newTask.description = data.value;
    } else {
      this.issues[data.id].newTask.description = data.value;
    }
  }

  onUpdateTaskStart(data) {
    if (data.type === "branch") {
      this.branches[data.id].newTask.start = data.value;
    } else {
      this.issues[data.id].newTask.start = data.value;
    }
  }

  onUpdateTaskDuration(data) {
    if (data.type === "branch") {
      this.branches[data.id].newTask.duration = data.value;
    } else {
      this.issues[data.id].newTask.duration = data.value;
    }
  }

  onCreateTaskSuccess(data) {
    //clear all branch / issue new task field
    this.bootstrapBranchTasks();
    this.bootstrapIssueTasks();
  }

  onCreateTaskFail(errorMessage) {
    console.log(errorMessage);
  }

  onToggleCreateBranch() {
    if (this.createBranch) {
      this.bootstrapBranch();
    }
    this.createBranch = !this.createBranch;
  }

  onToggleCreateIssue() {
    // when closing the creating issue box
    if (this.createIssue) {
      this.bootstrapIssue();
    }
    this.createIssue = !this.createIssue;
  }

  onToggleCreateTask(data) {
    // Get the item and toggle its taskBox
    if (data.type === "branch") {
      this.branches[data.id].taskBox = !this.branches[data.id].taskBox;
    } else {
      // type === "issue"
      this.issues[data.id].taskBox = !this.issues[data.id].taskBox;
    }
  }

}

export default alt.createStore(RepoStore);
