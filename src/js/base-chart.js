/*!
 * Base charts
 *
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./base-chart-utils', './base-chart-axis'] , factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./base-chart-utils'), require('./base-chart-axis'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.baseChartUtils/*, root.baseChartAxis*/);
    }
}(this, function (utils, bc_axis) {

'use:strict';

/**
 * The entrypoint
 * @return {[type]} [description]
 */
function BaseChart () {


  /**
   * The base chart is a simple object that contains methods that will be merged into any of the d3by5 charts
   * @type {Object}
   *       - height - setter/getter for the chart height
   *       - width  - setter/getter for the chart width
   *       - data   - setter/getter for the indata of the chart
   *       - fillColor
   *       - padding
   *       - margin
   *
   * Usage:
   * 		calling any of the functions without a value will return the currently set value
   * 		calling with a value will set the value on the target and return the target object (the chart that implements it)
   */
  var base = {



    DATATYPE_UNIDIMENSIONAL: "unidimensional",
    DATATYPE_MULTIDIMENSIONAL: "multidimensional",

    options: {
      margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              },
      width: 640,
      height: 400,
      padding: 5,
      fillColor: '',
      idPrefix: 'id-',
      on: [],
      valuesFormat: null,

    },

    /**
     * Sets the chart-padding
     * @param  {Number} value - the padding of the chart
     * @return {Mixed}        - the value or chart
     */
    fillColor:  function (value) {
      if (!arguments.length) return this.options.fillColor;
      if (this.options.data) {
        this.options.fillColor = this._getColorAccessor(this.options.data, value);
      } else {
        this.options.fillColor = value;
      }
      return this;
    },

    /**
     * Sets the chart-padding
     * @param  {Number} value - the padding of the chart
     * @return {Mixed}        - the value or chart
     */
    padding: function (value) {
      if (!arguments.length) return this.options.padding;
      this.options.padding = value;
      return this;
    },

    /**
     * Sets the width of a chart
     * @param  {Number} value - the width of the chart
     * @return {Mixed}        - the value or this
     */
    width: function (value) {
      if (!arguments.length) return this.options.width;
      this.options.width = value;
      return this;
    },
    /**
     * Sets the height of a chart
     * @param  {Number} value - the height of the chart
     * @return {Mixed}        - the value or chart
     */
    height: function (value) {
      if (!arguments.length) return this.options.height;
      this.options.height = value;
      return this;
    },
    /**
     * Sets the data on a chart
     * @param  {Number} value - the data used to draw the chart
     * @return {Mixed}        - the value or chart
     */
    data: function  (value) {
      if (!arguments.length) return this.options.data;
      this.options.data = this._parseData(value);
      if (typeof this.updateData === 'function') {
        this.updateData();
      }
      return this;
    },
    /**
     * Sets the marging of a chart, this can be a single value or an object/array
     * @param  {Mixed} argument[0]  - a margin fragment or complete margin object
         *                             Number - a single number, used for margin top, or matched as below
         *                             Object - a valid margins object {top, right, bottom, left}
     * @param  {Number} argument[1] - number describing right or horizontal margin
     * @param  {Number} argument[2] - number describing bottom margin
     * @param  {Number} argument[3] - number describing left margin
     *
     * @return {Mixed}       - the margin object or chart
     */
    margin:  function () {
      if (!arguments.length) return this.options.margin;
      this.options.margin = this._createMargins.apply(this, arguments);
      return this;
    },

    /**
     * Sets a listener on the clices of the chart
     * @param  {String} action    - the type of action to listen to ( ie. 'click', 'mouseover')
     * @param  {Function} method  -  A bound method to be called when the action is invoked, passes the datum for this specific slice
     * @return {Mixed}            - the value or chart
     */
    on: function (action, method) {
      if (!arguments.length) return this.options.on;
      this.off(action, method);
      this.options.on.push({action: action, method: method});
      return this;
    },

    off: function (action, method) {
      var onIndex = []
        , i ;

      for(i = 0; i < this.options.on.length; i += 1) {
        if (action === this.options.on[i].action) {
          if (method) {
            if (method === this.options.on[i],method) {
              onIndex.push(i);
            }
          } else {
            onIndex.push(i);
          }
        }
      }
      // remove all in the idexes
      for (i = onIndex.length; i > 0; i -= 1) {
        this.options.on.splice(i, 1);
      }
    },

    axis: function () {
      return bc_axis();
    },

    // setter/getter for formating value strings
    valuesFormat: function(value) {
      return arguments.length ? (this.options.valuesFormat = value, this) : this.options.valuesFormat;
    },


  };
  base = _.extend(base, utils);
  return base;
}


  return BaseChart();
}));