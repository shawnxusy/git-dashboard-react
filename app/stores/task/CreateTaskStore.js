/* jshint esnext:true */

import alt from 'altInstance';
import moment from 'moment';

import CreateTaskActions from 'actions/task/CreateTaskActions';

class CreateTaskStore {
  constructor() {
    this.bindActions(CreateTaskActions);
    this.bootstrap();
  }

  bootstrap() {
    this.name = "";
    this.description = "";
    this.start = "";
    this.duration = 1;
  }

  static displayName = 'CreateTaskStore';

  onCreateTaskSuccess(data) {
    //clear the fields
    this.bootstrap();
  }

  onCreateTaskFail(errorMessage) {
    console.log(errorMessage);
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }

  onUpdateDescription(event) {
    this.description = event.target.value;
  }

  onUpdateStart(date) {
    this.start = date;
  }

  onUpdateDuration(event) {
    this.duration = event.target.value;
  }

}

export default alt.createStore(CreateTaskStore);
