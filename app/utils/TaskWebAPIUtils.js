/* jshint esnext: true */
import $ from 'jquery';
import moment from 'moment';

const utils = {

  createTask: (name, repoName, branch, issue, description, start, duration) => {
    return $.ajax({
      url: '/api/task',
      type: 'POST',
      data: {id: Date.now(), name: name, repoName: repoName, branch: branch, issue: issue, description: description, start: start.toDate(), duration: duration}
    });
  },

  getTasks: () => {
    return $.ajax({
      url: '/api/tasks',
      type: 'GET'
    });
  },

  deleteTask: (id) => {
    return $.ajax({
      url: '/api/task',
      type: 'DELETE',
      data: {id: id}
    });
  }

};

export default utils;
