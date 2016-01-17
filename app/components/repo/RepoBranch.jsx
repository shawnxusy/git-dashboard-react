/* jshint esnext:true */

import React from 'react';
import CreateTask from 'components/task/CreateTask';
import RepoActions from 'actions/repo/RepoActions';

export default class RepoBranchList extends React.Component {

  toggleCreateTask = () => {
    RepoActions.toggleCreateTask(this.props.branch.commit.sha);
  }

  render() {
    return (
      <div key={this.props.branch.commit.sha}>
        {this.props.branch.name}
        <a onClick={this.toggleCreateTask}>Create task</a>
        <span className={this.props.branch.taskBox ? '': 'no-display'}><CreateTask /></span>
      </div>
    );
  }
}
