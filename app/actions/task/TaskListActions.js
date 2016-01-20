/* jshint esnext: true */
import alt from 'altInstance';
import TaskWebAPIUtils from 'utils/TaskWebAPIUtils';

class TaskListActions {
  constructor() {
    this.generateActions(
      'getTasksSuccess',
      'getTasksFail',
      'deleteTaskSuccess',
      'deleteTaskFail'
    );
  }

  getTasks() {
    TaskWebAPIUtils.getTasks()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.getTasksSuccess(response);
        } else {
          this.actions.getTasksFail(response);
        }
      });
  }

  deleteTask(id) {
    TaskWebAPIUtils.deleteTask(id)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.deleteTaskSuccess(response);
        } else {
          this.actions.deleteTaskFail(response);
        }
      });
  }
}

export default alt.createActions(TaskListActions);
