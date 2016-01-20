/* jshint esnext:true */

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import RepoActions from 'actions/repo/RepoActions';

// If it's server side rendering, skip the import since Datepicker works only on window
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  var DatePicker = require('react-datepicker');
  require('react-datepicker/dist/react-datepicker.css');
}

export default class CreateTask extends React.Component {

  updateTaskName = (event) => {
    let data = {
      type: this.props.branch ? "branch" : "issue",
      value:event.target.value,
      id: this.props.idx
    };
    RepoActions.updateTaskName(data);
  }

  updateTaskDescription = (event) => {
    let data = {
      type: this.props.branch ? "branch" : "issue",
      value: event.target.value,
      id: this.props.idx
    };
    RepoActions.updateTaskDescription(data);
  }

  updateTaskStart = (date) => {
    let data = {
      type: this.props.branch ? "branch" : "issue",
      value: date,
      id: this.props.idx
    }
    RepoActions.updateTaskStart(data);
  }

  updateTaskDuration = (event) => {
    let data = {
      type: this.props.branch ? "branch" : "issue",
      value: event.target.value,
      id: this.props.idx
    }
    RepoActions.updateTaskDuration(data);
  }

  render() {
    let taskName, taskDescription, taskStart, taskDuration, typeName;
    if (this.props.branch) {
      taskName = (<input type="text" className="form-control" ref="taskNameField" value={this.props.branch.newTask.name}
            onChange={this.updateTaskName} placeholder="Task name" autoFocus required/>);
      taskDescription = (<input type="text" className="form-control" ref="taskDescriptionField" value={this.props.branch.newTask.description}
            onChange={this.updateTaskDescription} placeholder="Description (optional)"/>);
      taskStart = (<DatePicker selected={this.props.branch.newTask.start} ref="taskStartField" onChange={this.updateTaskStart} />);
      taskDuration = (<input type="text" className="form-control" ref="taskDurationField" value={this.props.branch.newTask.duration}
            onChange={this.updateTaskDuration} placeholder="Duration for this task (in days)"/>);
      typeName = (<input type="text" className="form-control" ref="branchField" defaultValue={this.props.branch.name} disabled/>);
    } else {
      taskName = (<input type="text" className="form-control" ref="taskNameField" value={this.props.issue.newTask.name}
            onChange={this.updateTaskName} placeholder="Task name" autoFocus required/>);
      taskDescription = (<input type="text" className="form-control" ref="taskDescriptionField" value={this.props.issue.newTask.description}
            onChange={this.updateTaskDescription} placeholder="Description (optional)"/>);
      taskStart = (<DatePicker selected={this.props.issue.newTask.start} ref="taskStartField" onChange={this.updateTaskStart} />);
      taskDuration = (<input type="text" className="form-control" ref="taskDurationField" value={this.props.issue.newTask.duration}
            onChange={this.updateTaskDuration} placeholder="Duration for this task (in days)"/>);
      typeName = (<input type="text" className="form-control" ref="issueField" defaultValue={this.props.issue.title} disabled/>);
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="create-task-form">
        <div className="form-group">
          {taskName}
        </div>
        <div className="form-group">
          {typeName}
        </div>
        <div className="form-group">
          {taskDescription}
        </div>
        <div className="form-group task-date-picker">
          {taskStart}
        </div>
        <div className="form-group">
          {taskDuration}
        </div>
        <button type="submit" className="btn btn-primary task-submit">Submit</button>
      </form>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.branch) {
      RepoActions.createTask(this.props.branch.newTask.name, this.props.repoName, this.props.branch.name || '', '', this.props.branch.newTask.description, this.props.branch.newTask.start, this.props.branch.newTask.duration);
    } else {
      RepoActions.createTask(this.props.issue.newTask.name, this.props.repoName, '', this.props.issue.title || '', this.props.issue.newTask.description, this.props.issue.newTask.start, this.props.issue.newTask.duration);
    }
    this.props.isDone();
  }
}
