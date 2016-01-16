/* jshint esnext: true */
import $ from 'jquery';

const utils = {
  /*
   * @param
   * @return {Promise}
   */
  getRepos: () => {
    return $.ajax({
      url: '/api/repos/shawnxusy',
      type: 'GET'
    });
  },

  getRepo: (repoName) => {
    return $.ajax({
        url: '/api/repo/' + repoName,
        type: 'GET'
    });
  }

};

export default utils;
