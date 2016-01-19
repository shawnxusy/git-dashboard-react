/* jshint esnext:true */

import alt from 'altInstance';
import TaskListActions from 'actions/task/TaskListActions';

class TaskListStore {
  constructor() {
    this.bindActions(TaskListActions);
    this.tasks = [];
    this.config = {
        xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    };
  }

  static displayName = 'TaskListStore';

  onGetTasksSuccess(data) {
    this.tasks = data;
  }

  onGetTasksFail(errorMessage) {
    console.log(errorMessage);
  }

}

export default alt.createStore(TaskListStore);
