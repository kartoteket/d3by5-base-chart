'use:strict';
var BC = {};
// define d3by5-base-chart for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = BC;

// define d3by5_PieChart as an AMD module
} else if (typeof define === 'function' && define.amd) {
	define(BC);
}

/**
 * The base chart is a simple object that contains methods that will be merged into any of the d3by5 charts
 * @type {Object}
 *       - height - setter/getter for the chart height
 *       - width  - setter/getter for the chart width
 *       - data   - setter/getter for the indata of the chart
 *
 * Usage:
 * 		calling any of the functions without a value will return the currently set value
 * 		calling with a value will set the value on the target and return the target object (the chart that implements it)
 */
BC = {
  /**
   * Sets the width of a chart
   * @param  {Number} value - the width of the chart
   * @return {Mixed}        - the value or this
   */
  width: function(value) {
    if (!arguments.length) return this.width;
    this.width = value;
    return this;
  },
  /**
   * Sets the height of a chart
   * @param  {Number} value - the height of the chart
   * @return {Mixed}        - the value or this
   */
  height: function(value) {
    if (!arguments.length) return this.height;
    this.height = value;
    return this;
  },
  /**
   * Sets the data on a chart
   * @param  {Number} value - the data used to draw the chart
   * @return {Mixed}        - the value or this
   */
  data: function (value) {
  	if (!arguments.length) return this.height;
    this.height = value;
    return this;
  }
};