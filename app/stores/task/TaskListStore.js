/* jshint esnext:true */

import alt from 'altInstance';
import TaskListActions from 'actions/task/TaskListActions';

class TaskListStore {
  constructor() {
    this.bindActions(TaskListActions);
    this.tasks = [];
  }

  static displayName = 'TaskListStore';

  onGetTasksSuccess(data) {
    console.log("tasks are: ", data);
    this.tasks = data;
  }

  onGetTasksFail(errorMessage) {
    console.log(errorMessage);
  }

}

export default alt.createStore(TaskListStore);
