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
        type: 'xrange'
      },
      title: {
        text: 'Git tasks gantt chart'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: '',
        categories: [],
        min: 0,
        max: 0
      },
      series: [{
        name: 'Tasks',
        borderRadius: 3,
        pointWidth: 5,
        data: []
      }, {
        name: "Issues",
        borderRadius: 3,
        pointWidth: 5,
        data: []
      }]
    };
  }

  static displayName = 'TaskListStore';

  onGetTasksSuccess(data) {
    this.bootstrapChartConfigs();
    this.tasks = data;
    _.each(this.tasks, function(task, idx) {
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
    this.chartConfigs.yAxis.max = this.tasks.length - 1;
  }

  onGetTasksFail(errorMessage) {
    console.log(errorMessage);
  }

}

export default alt.createStore(TaskListStore);
