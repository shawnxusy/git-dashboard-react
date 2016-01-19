/* jshint esnext: true */
import $ from 'jquery';

const utils = {

  searchRepo: (searchText) => {
    return $.ajax({
      url: 'https://api.github.com/search/repositories?q=' + searchText,
      type: 'GET'
    });
  }
};

export default utils;
