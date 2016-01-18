/* jshint esnext:true */

import React from 'react';
import TaskListStore from 'stores/task/TaskListStore';
import TaskListActions from 'actions/task/TaskListActions';

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
  }

  render() {
    let taskNodes = this.state.tasks.map((task, index) => {
      return (
        <div key={index}>
          <div>{task.name} - {task.duration} hours</div>
        </div>
      );
    });

    return (
      <div>
        <h3>A list of tasks listed here</h3>
        {taskNodes}
      </div>
    );
  }
}
