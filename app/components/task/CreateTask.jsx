/* jshint esnext:true */

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CreateTaskStore from 'stores/task/CreateTaskStore';
import CreateTaskActions from 'actions/task/CreateTaskActions';

// If it's server side rendering, skip the import since Datepicker works only on window
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  var DatePicker = require('react-datepicker');
  require('react-datepicker/dist/react-datepicker.css');
}

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = CreateTaskStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CreateTaskStore.listen(this.onChange);
  }


  componentWillUnmount() {
    CreateTaskActions.clearTask();
    this.props.isDone();
    CreateTaskStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let typeName;
    if (this.props.branchName) {
      typeName = (<input type="text" className="form-control" ref="branchField" defaultValue={this.props.branchName} disabled/>);
    } else {
      typeName = (<input type="text" className="form-control" ref="issueField" defaultValue={this.props.issueName} disabled/>);
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input type="text" className="form-control" ref="nameTextField" value={this.state.name}
                  onChange={CreateTaskActions.updateName} placeholder="Task name" autoFocus required/>
          </div>
          <div className="form-group">
            {typeName}
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref="descriptionTextField" value={this.state.description}
                  onChange={CreateTaskActions.updateDescription} placeholder="Description (optional)"/>
          </div>
          <div className="form-group">
            <DatePicker selected={this.state.start} onChange={CreateTaskActions.updateStart} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref="durationTextField" value={this.state.duration}
                  onChange={CreateTaskActions.updateDuration} placeholder="Duration for this task"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.branchName) {
      CreateTaskActions.createTask(this.state.name, this.props.repoName, ReactDOM.findDOMNode(this.refs.branchField).defaultValue || '', '', this.state.description, this.state.start, this.state.duration);
    } else {
      CreateTaskActions.createTask(this.state.name, this.props.repoName, '', ReactDOM.findDOMNode(this.refs.issueField).defaultValue || '', this.state.description, this.state.start, this.state.duration);
    }
    this.props.isDone();
  }
}
