/* jshint esnext:true */

import React from 'react';
import CreateTask from 'components/task/CreateTask';
import RepoActions from 'actions/repo/RepoActions';

export default class RepoBranch extends React.Component {

  toggleCreateTask = () => {
    let data = {
      type: "branch",
      id: this.props.branch.commit.sha
    }
    RepoActions.toggleCreateTask(data);
  }

  render() {
    return (
      <div key={this.props.branch.commit.sha}>
        {this.props.branch.name}
        <a onClick={this.toggleCreateTask}>Create task</a>
        <span className={this.props.branch.taskBox ? '': 'no-display'}><CreateTask isDone={this.toggleCreateTask} branchName={this.props.branch.name} repoName={this.props.repoName} /></span>
      </div>
    );
  }
}
