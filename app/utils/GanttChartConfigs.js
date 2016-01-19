

module.exports = function(H) {
  var defaultPlotOptions = H.getOptions().plotOptions,
      columnType = H.seriesTypes.column,
      each = H.each;

  defaultPlotOptions.xrange = H.merge(defaultPlotOptions.column, {});
  H.seriesTypes.xrange = H.extendClass(columnType, {
      type: 'xrange',
      parallelArrays: ['x', 'x2', 'y'],
      requireSorting: false,
      animate: H.seriesTypes.line.prototype.animate,

      /**
       * Borrow the column series metrics, but with swapped axes. This gives free access
       * to features like groupPadding, grouping, pointWidth etc.
       */
      getColumnMetrics: function () {
          var metrics,
              chart = this.chart;

          function swapAxes() {
              each(chart.series, function (s) {
                  var xAxis = s.xAxis;
                  s.xAxis = s.yAxis;
                  s.yAxis = xAxis;
              });
          }

          swapAxes();

          this.yAxis.closestPointRange = 1;
          metrics = columnType.prototype.getColumnMetrics.call(this);

          swapAxes();

          return metrics;
      },
      translate: function () {
          columnType.prototype.translate.apply(this, arguments);
          var series = this,
              xAxis = series.xAxis,
              metrics = series.columnMetrics;

          H.each(series.points, function (point) {
              var barWidth = xAxis.translate(H.pick(point.x2, point.x + (point.len || 0))) - point.plotX;
              point.shapeArgs = {
                  x: point.plotX,
                  y: point.plotY + metrics.offset,
                  width: barWidth,
                  height: metrics.width
              };
              point.tooltipPos[0] += barWidth / 2;
              point.tooltipPos[1] -= metrics.width / 2;
          });
      }
  });

  /**
   * Max x2 should be considered in xAxis extremes
   */
  H.wrap(H.Axis.prototype, 'getSeriesExtremes', function (proceed) {
      var axis = this,
          dataMax = Number.MIN_VALUE;

      proceed.call(this);
      if (this.isXAxis) {
          each(this.series, function (series) {
              each(series.x2Data || [], function (val) {
                  if (val > dataMax) {
                      dataMax = val;
                  }
              });
          });
          if (dataMax > Number.MIN_VALUE) {
              axis.dataMax = dataMax;
          }
      }
  });
};
