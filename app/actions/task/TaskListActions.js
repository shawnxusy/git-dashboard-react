/* jshint esnext: true */
import alt from 'altInstance';
import TaskWebAPIUtils from 'utils/TaskWebAPIUtils';

class TaskListActions {
  constructor() {
    this.generateActions(
      'getTasksSuccess',
      'getTasksFail'
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
}

export default alt.createActions(TaskListActions);
