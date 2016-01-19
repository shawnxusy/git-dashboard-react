/* jshint esnext:true */

import React from 'react';
import CreateTask from 'components/task/CreateTask';
import RepoActions from 'actions/repo/RepoActions';

export default class RepoBranch extends React.Component {

  toggleCreateTask = () => {
    let data = {
      type: "branch",
      id: this.props.idx
    }
    RepoActions.toggleCreateTask(data);
  }

  render() {
    return (
      <div>
        {this.props.branch.name}
        <a onClick={this.toggleCreateTask}>Create task</a>
        <span className={this.props.branch.taskBox ? '': 'no-display'}><CreateTask isDone={this.toggleCreateTask} branch={this.props.branch} repoName={this.props.repoName} idx={this.props.idx} /></span>
      </div>
    );
  }
}
