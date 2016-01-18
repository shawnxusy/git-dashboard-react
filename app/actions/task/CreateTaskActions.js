/* jshint esnext: true */
import alt from 'altInstance';
import TaskWebAPIUtils from 'utils/TaskWebAPIUtils';

class CreateTaskActions {
  constructor() {
    this.generateActions(
      'createTaskSuccess',
      'createTaskFail',
      'updateName',
      'updateDescription',
      'updateStart',
      'updateDuration'
    );
  }

  createTask(name, repoName, branch, issue, description, start, duration) {
    TaskWebAPIUtils.createTask(name, repoName, branch, issue, description, start, duration)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.createTaskSuccess(response);
        } else {
          this.actions.createTaskFail(response);
        }
      });
  }
}

export default alt.createActions(CreateTaskActions);
