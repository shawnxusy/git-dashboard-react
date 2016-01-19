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

    this.drawGanttChart();
  }

  componentWillUnmount() {
    TaskListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  drawGanttChart() {
    require('../../utils/GanttChartConfigs')(ReactHighcharts.Highcharts);
    // Defer the drawing (should do better waiting with promises)
    var that = this;
    setTimeout(function(){
      if (that.state.tasks.length > 0) {
        ReactDOM.render(React.createElement(ReactHighcharts, { config: that.state.chartConfigs }), document.getElementById('test'));
      }
    }, 500);
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
