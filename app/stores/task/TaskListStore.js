/* jshint esnext:true */

import alt from 'altInstance';
import _ from 'lodash';
import moment from 'moment';

import TaskListActions from 'actions/task/TaskListActions';

class TaskListStore {
  constructor() {
    this.bindActions(TaskListActions);
    this.tasks = [];
    this.bootstrapChartConfigs();
  }

  bootstrapChartConfigs() {
    this.chartConfigs = {
      chart: {
        type: 'xrange',
        backgroundColor: 'rgba(234, 238, 239, 0.15)',
        spacingTop: 20,
        style: {
          color: "#eaeeef",
          fontFamily: "'Raleway', Helvetica, Arial, sans-serif;"
        }
      },
      colors: ['#e87579', "#eeeb91", '#24acba'],
      title: {
        text: 'Tasks Gantt Chart',
        style: {
          color: "#eaeeef",
          fontFamily: "'Raleway', Helvetica, Arial, sans-serif;"
        }
      },
      xAxis: {
        type: 'datetime',
        gridLineColor: '#eaeeef',
        lineColor: '#eaeeef',
        labels: {
          style: {
            color: "#eaeeef",
            fontFamily: "'Raleway', Helvetica, Arial, sans-serif;"
          }
        },
        crosshair: {
          color: 'rgba(234, 238, 239, 0.2)',
          dashStyle: "ShortDot",
          snap: false
        }
      },
      yAxis: {
        title: '',
        categories: [],
        min: 0,
        max: 0,
        gridLineColor: 'rgba(234, 238, 239, 0.5)',
        gridLineDashStyle: "ShortDot",
        labels: {
          style: {
            color: "#eaeeef",
            fontFamily: "'Raleway', Helvetica, Arial, sans-serif;"
          }
        }
      },
      legend: {
        itemStyle: {
          color: '#eaeeef',
          fontFamily: "'Raleway', Helvetica, Arial, sans-serif;"
        }
      },
      series: [{
        name: 'Branches',
        borderRadius: 3,
        pointWidth: 5,
        borderWidth: 0,
        data: []
      }, {
        name: "Issues",
        borderRadius: 3,
        pointWidth: 5,
        borderWidth: 0,
        data: []
      }],
      tooltip: {
        crosshairs: true
      }
    };
  }

  static displayName = 'TaskListStore';

  bootstrapChartWithTasks(tasks) {
    this.bootstrapChartConfigs();
    _.each(tasks, function(task, idx) {
      this.chartConfigs.yAxis.categories.push(task.name);
      let startDate = moment(task.start);
      let endDate = moment(task.start).add(task.duration, 'days');
      if (task.branch) {
        this.chartConfigs.series[0].data.push({
          x: Date.UTC(startDate.year(), startDate.month(), startDate.date()),
          x2: Date.UTC(endDate.year(), endDate.month(), endDate.date()),
          y: idx
        })
      } else {
        this.chartConfigs.series[1].data.push({
          x: Date.UTC(startDate.year(), startDate.month(), startDate.date()),
          x2: Date.UTC(endDate.year(), endDate.month(), endDate.date()),
          y: idx
        })
      }
    }, this);
    this.chartConfigs.yAxis.max = tasks.length - 1;
  }

  onGetTasksSuccess(data) {
    this.tasks = data;
    this.bootstrapChartWithTasks(this.tasks);
  }

  onGetTasksFail(errorMessage) {
    console.log(errorMessage);
  }

  onDeleteTaskSuccess(data) {
    this.tasks = data;
    this.bootstrapChartWithTasks(this.tasks);
  }

  onDeleteTaskFail(errorMessage) {
    console.log(errorMessage);
  }

}

export default alt.createStore(TaskListStore);
