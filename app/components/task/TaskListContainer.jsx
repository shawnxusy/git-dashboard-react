/* jshint esnext:true */

import React from 'react';
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

    ReactDOM.render(React.createElement(ReactHighcharts, { config: this.state.config }), document.getElementById('test'));
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
        <div id="test">
        </div>
        <h3>A list of tasks listed here</h3>
        {taskNodes}
      </div>
    );
  }
}
