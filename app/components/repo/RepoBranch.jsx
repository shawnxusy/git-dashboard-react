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
      <div className="branch">
        <div className="row">
          <div className="branch-info col-sm-8">
            {this.props.branch.name}
          </div>
          <a onClick={this.toggleCreateTask} className="add-task col-sm-3 center">
            <i className={this.props.branch.taskBox ? 'fa fa-times' : 'fa fa-tasks'}></i>
            {this.props.branch.taskBox ? 'Cancel' : 'New Task'}
          </a>
        </div>
        <span className={this.props.branch.taskBox ? '': 'no-display'}><CreateTask isDone={this.toggleCreateTask} branch={this.props.branch} repoName={this.props.repoName} idx={this.props.idx} /></span>
      </div>
    );
  }
}
