/* jshint esnext:true */

import React from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

import TaskListStore from 'stores/task/TaskListStore';
import TaskListActions from 'actions/task/TaskListActions';

const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  var Highcharts = require('react-highcharts/dist/bundle/highcharts');
  var ReactHighcharts = require('react-highcharts');
}

export default class TaskListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = TaskListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    TaskListStore.listen(this.onChange);
    TaskListActions.getTasks();

  }

  componentWillUnmount() {
    TaskListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    this.drawGanttChart();
  }

  drawGanttChart() {
    require('../../utils/GanttChartConfigs')(ReactHighcharts.Highcharts);
    // Defer the drawing (should do better waiting with promises)
    var that = this;
    setTimeout(function(){
      if (that.state.tasks.length > 0) {
        ReactDOM.render(React.createElement(ReactHighcharts, { config: that.state.chartConfigs }), document.getElementById('task-chart'));
      }
    }, 500);
  }

  deleteTask = (id) => {
    TaskListActions.deleteTask(id);
  }

  render() {
    let taskNodes = this.state.tasks.map((task, index) => {
      return (
        <div key={index} className="task-node row">
          <div className="task-wrapper col-sm-8">
            <div className="task-name">
              <i className={task.branch ? "fa fa-exchange task-icon-branch" : "fa fa-exclamation-triangle task-icon-issue"}></i>
              {task.name}
              <span className="task-duration">{task.duration} hours</span>
            </div>
            <div className="task-detail">
              <div> Repo: {task.repoName} </div>
              <div>{task.branch ? 'Branch: ' + task.branch : 'Issue: ' + task.issue}</div>
            </div>
          </div>
          <a onClick={this.deleteTask.bind(this, task.id)} className="delete-task col-sm-3 center">
            <i className="fa fa-times"></i> Delete task
          </a>
        </div>
      );
    });

    return (
      <div className="tasks">
        <div className="row">
          <p className="title col-sm-4">Tasks</p>
          <div className="links col-sm-offset-4 col-sm-4">
            <Link to="/" className="toggle">Repos</Link>
            <div className="toggle toggle-on">Tasks</div>
          </div>
        </div>
        <div id="task-chart">
        </div>
        <h4>All Tasks</h4>
        <div className="task-list">
        {taskNodes}
        </div>
      </div>
    );
  }
}
