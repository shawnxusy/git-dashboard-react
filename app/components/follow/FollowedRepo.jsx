/* jshint esnext:true */

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  var Highcharts = require('react-highcharts/dist/bundle/highcharts');
  var ReactHighcharts = require('react-highcharts');
}

export default class FollowedRepo extends React.Component {

  componentDidMount() {
    this.drawCommitChart();
  }

  drawCommitChart() {
    // Defer the drawing (should do better waiting with promises here)
    let that = this;
    let configs = this.buildConfigs();
    setTimeout(function(){
      if (that.props.repo.commits.length > 0) {
        ReactDOM.render(React.createElement(ReactHighcharts, { config: configs }), document.getElementById('time-series-chart' + that.props.repo.owner + that.props.repo.name));
      }
    }, 2500);
  }

  buildConfigs() {
    return {
      chart: {
        zoomType: 'x',
        backgroundColor: 'rgba(234, 238, 239, 0.15)',
        spacingTop: 20,
        style: {
          color: "#eaeeef",
          fontFamily: "'Raleway', Helvetica, Arial, sans-serif;"
        }
      },
      colors: ['#e87579', "#eeeb91", '#24acba'],
      title: {
        text: this.props.repo.owner + "/" + this.props.repo.name,
        style: {
          color: "#eaeeef"
        }
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        style: {
          color: "#b6bfc1"
        }
      },
      xAxis: {
        type: 'datetime',
        gridLineColor: '#eaeeef',
        lineColor: '#eaeeef',
        labels: {
          style: {
            color: "#eaeeef"
          }
        },
        crosshair: {
          color: 'rgba(234, 238, 239, 0.2)',
          dashStyle: "ShortDot",
          snap: false
        }
      },
      yAxis: {
          title: {
              text: 'Commits'
          },
          gridLineColor: 'rgba(234, 238, 239, 0.5)',
          gridLineDashStyle: "ShortDot",
          labels: {
            style: {
              color: "#eaeeef"
            }
          }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
              linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
              },
              stops: [
                  [0, "#e87579"],
                  [1, "rgba(238, 235, 134, 0.1)"]
              ]
          },
          marker: {
              radius: 2
          },
          lineWidth: 0,
          states: {
              hover: {
                  lineWidth: 1
              }
          },
          threshold: null
        }
      },

      series: [{
          type: 'area',
          name: 'commits',
          data: this.buildData()
      }]
  };
}

  buildData() {
    let data = [];
    _.each(this.props.repo.commits, function(commit) {
      _.each(commit.days, function(dailyCommit, index) {
        let startDate = moment.unix(commit.week);
        let dateMoment = startDate.add(index, 'days');
        data.push([Date.UTC(dateMoment.year(), dateMoment.month(), dateMoment.date()), dailyCommit]);
      }, this);
    }, this);
    return data;
  }

  render() {
    return (
      <div>
        <div id={"time-series-chart" + this.props.repo.owner + this.props.repo.name} className="chart"></div>
      </div>
    );
  }
}
