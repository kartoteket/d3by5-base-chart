'use:strict';
// var d3 = require('d3');
var base = {};
// define d3by5-base-chart for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
  var d3 = require('d3');
  module.exports = base;

// define d3by5_PieChart as an AMD module
} else if (typeof define === 'function' && define.amd) {
  var d3 = require('d3');
  define(base);

// define the base in a global namespace d3By5
} else {
  Window.d3By5 = Window.d3By5 || {};
  Window.d3By5.base = base;
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



    /**
     * Sets the chart-padding
     * @param  {Number} value - the padding of the chart
     * @return {Mixed}        - the value or chart
     */
    base.fillColor =  function (value) {
      if (!arguments.length) return this.options.fillColor;
      this.options.fillColor = value;
      return this;
    };
    /**
     * Sets the chart-padding
     * @param  {Number} value - the padding of the chart
     * @return {Mixed}        - the value or chart
     */
    base.padding = function (value) {
      if (!arguments.length) return this.options.padding;
      this.options.padding = value;
      return this;
    };

    /**
     * Sets the width of a chart
     * @param  {Number} value - the width of the chart
     * @return {Mixed}        - the value or this
     */
    base.width = function (value) {
      if (!arguments.length) return this.options.width;
      this.options.width = value;
      return this;
    };
    /**
     * Sets the height of a chart
     * @param  {Number} value - the height of the chart
     * @return {Mixed}        - the value or chart
     */
    base.height = function (value) {
      if (!arguments.length) return this.options.height;
      this.options.height = value;
      return this;
    };
    /**
     * Sets the data on a chart
     * @param  {Number} value - the data used to draw the chart
     * @return {Mixed}        - the value or chart
     */
    base.data = function  (value) {
      if (!arguments.length) return this.options.data;
      this.options.data = this.colorize(value);
      if (typeof this.updateData === 'function') {
        this.updateData();
      }
      return this;
    };

    /**
     * Sets a listener on the clices of the chart
     * @param  {String} action    - the type of action to listen to ( ie. 'click', 'mouseover')
     * @param  {Function} method  -  A bound method to be called when the action is invoked, passes the datum for this specific slice
     * @return {Mixed}            - the value or chart
     */
    base.on = function (action, method) {
      if (!arguments.length) return this.options.on;
      this.options.on = {action: action, method: method};
      return this;
    };

    base.colorize = function (inData) {
      var color = d3.scale.linear()
                    .domain([1,inData.length])
                    .interpolate(d3.interpolateHcl)
                    .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]); // make this in line with the color we came from
      // apply a color to all the datanodes
      data = inData.map(function (d, i) {
        d.color = d.color || color(i);
        return d;
      });

      return data;
    };