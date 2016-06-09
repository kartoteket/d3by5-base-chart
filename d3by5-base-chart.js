'use:strict';
// var d3 = require('d3');
var base = {};
// define d3by5-base-chart for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
  var d3 = require('d3');
  var _ = require('underscore');
  module.exports = base;

// define d3by5_PieChart as an AMD module
} else if (typeof define === 'function' && define.amd) {
  var d3 = require('d3');
  var _ = require('underscore');
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

    base.DATATYPE_UNIDIMENSIONAL = "unidimensional";
    base.DATATYPE_MULTIDIMENSIONAL = "multidimensional";

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
      this.options.data = this._parseData(value);
      if (typeof this.updateData === 'function') {
        this.updateData();
      }
      return this;
    };
    /**
     * Sets the marging of a chart, this can be a single value or an object/array
     * @param  {Mixed} value - the data used to draw the chart
     *                           Array - [x,x,x,x] where x is a number, corresponding to a position, exactly 4 elements
     *                           Number - a single number
     *                           Object - a valid margins object {top, right, bottom, left}
     *
     * @return {Mixed}       - the margin object or chart
     */
     base.margin =  function (value) {
      if (!arguments.length) return this.options.margin;

      /// single number passed
      if (_.isNumber(value)) {
        this.options.margin = {
                                top: value,
                                right: value,
                                bottom: value,
                                left: value
                              };
      }
      // array with 4 elements [1,2,3,4]
      else if (_.isArray(value) && value.length === 4) {
        this.options.margin = {
                                top: value[0],
                                right: value[1],
                                bottom: value[2],
                                left: value[3]
                              };
      }
      // valid margins object
      else if (_.isObject(value) &&
                _.has(value, 'top') &&
                _.has(value, 'right') &&
                _.has(value, 'bottom') &&
                _.has(value, 'left')
                ) {
        this.options.margin = value;
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

    /**
     * Utility that updates the data by adding colors and a unique id
     * @param  {Array} inData - an array of objects
     *                          data can have two distinct layouts
     *                          unidimensional:
     *                            [{label, values},{labels, values}]
     *                          multidimensionsal: (key is a definition, label, for the values)
     *                            [
     *                              {label, key, values: [value, value, value]},
     *                              {label, key, values: [value, value, value]},
     *                              }
     *                            ]
     *                           or: (no key treat the data as a series of numbers)
     *                            [
     *                              {label, values: [value, value, value]},
     *                              {label, values: [value, value, value]},
     *                              }
     *                            ]
     * @return {Array}        - an array sanitized to ensure the props label, values, color and id is present
     */
    base._parseData = function (inData) {
      var color = this._getColorAccessor(inData);

      return this._mapData(inData, color);

    };

    base._mapData = function (inData, colorAccessor) {
      var idPrefix = this.options.idPrefix || 'id-'
        , that = this
      ;

      // set the type of indata
      this.options.dataType = this.DATATYPE_UNIDIMENSIONAL;

      // apply a color to all the datanodes
      data = inData.map(function (d, i) {
        var _outObject
        ;
        if (_.isArray(d.values)) {
          that.options.dataType = that.DATATYPE_MULTIDIMENSIONAL;
          d.values = d.values.map(function(value, index) {
                      _outObject = {
                                    label:d.keys[index],
                                    values: value,
                                    color: colorAccessor(index),
                                    id: _.uniqueId(idPrefix+i+'-')
                                  };
                      return _outObject;
                    });
        }
        d.color = d.color || colorAccessor(i);
        d.id    = d.id || _.uniqueId(idPrefix);
        return d;
      });

      return data;
    };

    /**
     * Returns an accessor function for retrieving the color based on the index of the data-node
     * @return {[type]} [description]
     */
    base._getColorAccessor = function (inData) {
      var that = this;
            // if there are no fillcolors set, create a range
      if (!this.options.fillColor) {
        return d3.scale.linear()
                  .domain([1,inData.length])
                  .interpolate(d3.interpolateHcl)
                  .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]); // make this in line with the color we came from
      }

      // the fillcolors are a range, and it can match the number of items
      if (_.isArray(this.options.fillColor) && this.options.fillColor.length < inData.length) {
        return function (i) {
          return that.options.fillColor[i];
        };
      }

      // fillColor is a single color
      // create an accessor function

      return function (x) {return that.options.fillColor;};

    };