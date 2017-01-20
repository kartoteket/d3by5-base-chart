/*!
 * BaseUtils
 *
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore','d3'] , factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('underscore'),require('d3'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root._, root.d3);
    }
}(this, function (_, d3) {

'use:strict';

function BaseUtils () {
  var utils = {

    /**
     * Base utils contains utility methods used by the base class and classes extending it
     */

    /**
     * Removes the toplevel svg if present
     */
    remove: function () {
      if (this.svg) {
        this.svg.remove();
      }
    },


    /**
     * returns the width calculated and adjusted for margins
     * @return {Number} - The width - margins
     */
    getCalculatedWidth: function () {
      return this.options.width - this.options.margin.left - this.options.margin.right;
    },

    /**
     * returns the height calculated and adjusted for margins
     * @return {Number} - The height - margins
     */
    getCalculatedHeight: function () {
      return this.options.height - this.options.margin.top - this.options.margin.bottom;
    },


    /**
     * Created the margins based on the input from base.margin()
     *
     * @param  {Mixed} v1  - a margin fragment or complete margin object
         *                             Number - a single number, used for margin top, or matched as below
         *                             Object - a valid margins object {top, right, bottom, left}
     * @param  {Number} v2 - number describing right or horizontal margin
     * @param  {Number} v3 - number describing bottom margin
     * @param  {Number} v4 - number describing left margin
     *
     * @return {[type]}    [description]
     */
    _createMargins: function (v1, v2, v3, v4) {
      var margin;
        // valid margins object
      if (_.isObject(v1) &&
                _.has(v1, 'top') &&
                _.has(v1, 'right') &&
                _.has(v1, 'bottom') &&
                _.has(v1, 'left')
                ) {

        // sanitice undefines. enforce number
        v1 = {
          'top' : v1.top || 0,
          'right' : v1.right || 0,
          'bottom' : v1.bottom || 0,
          'left' : v1.left || 0,
        };

        return v1;
      }

      if (!_.isNumber(v1)) {
        console.error('Could not match ', arguments ,' to any valid margin');
        return;// this.options.margin;
      }

      //
      // Arguments are any combination of numbers
      //
      if (arguments.length === 1) {
        margin = [+v1, +v1, +v1, +v1];
      }

      else if (arguments.length === 2) {
        margin = [v1, v2, v1, v2];
      }

      else if (arguments.length === 3) {
        margin = [v1, v2, v3, v2];
      }

      else if (arguments.length === 4) {
        margin = [v1, v2, v3, v4];
      }

      return _.object(['top','right','bottom','left'], margin);
    },
    /**
     * Parser entrypoint with default operations
     * The parser will create a color accessor to be used to fetch colors wnhen mapping the data
     * The parser will set the datatype options to DATATYPE_UNIDIMENSIONAL or DATATYPE_MULTIDIMENSIONAL
     * Parser will map data using a method _mapData in this scope
     *
     * @param  {Array} inData - data origination from base.data()
     * @return {[type]}       - A parsed and normalized data Array
     */
    _parseData: function (inData) {
      this.options.fillColor = this._getColorAccessor(inData, this.options.fillColor);
      this.options.dataSchema = this._getDataSchema(inData);
      this.options.dataType = this._getDataDimensions(inData);

      return this._mapData(inData);

    },

    /**
     * Performs a lazy simple lookup for events that may match a pattern (or really its a substring)
     * @param  {Mixed}  pattern  - The pattern to look for, just a substring that may match, could be a simple, or an array of patterns
     *                             The String 'mouse', 'Over' and 'MOusEOV' will match the event 'mouseover' and return this
     * @return {Array}           - A unique list of matching events
     */
    getEventsOfType: function (pattern) {
      var list = []
        , that = this
      ;

      if (_.isString(pattern)) {
        pattern = [pattern];
      }
      _.each(pattern, function (p) {
        list = list.concat(_.filter(that.options.on, function (e) {
          return e.action.indexOf(p) !== -1;
        }));
      });
      return _.uniq(list);
    },


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
    _mapData: function (inData) {
      var idPrefix = this.options.idPrefix
        , that = this
      ;

      // apply a color to all the datanodes
      data = inData.map(function (d, i) {
        var _outObject
        ;
        if (_.isArray(d.values)) {
          d.values = d.values.map(function(value, index) {
                      _outObject = {
                                    label: value.label,
                                    values: value.values,
                                    id: _.uniqueId(idPrefix+i+'-')
                                  };
                      return _outObject;
                    });
        }
        d.id = d.id || _.uniqueId(idPrefix);
        return d;
      });

      return data;
    },


    /**
     * Returns an accessor function for retrieving the color based on the index of the data-node
     * @return {function} - a linear accessorfunction
     */
    _getColorAccessor: function (inData, color) {
      var that = this
        , tempScale
      ;

      // check if the fillColor is a function (accessor), return it if so
      if(_.isFunction(color)) {
        return color;
      }
      // if the fillcolors are a range, check the length
      // if the size is bigger or equal to the data, use this accessor
      // if not, use a modulo opeartor in the accessor
      if (_.isArray(color)) {

        if(color.length > inData.length) {
          return function (i) {
            return color[i];
          };
        }
        var l = color.length;
        return function (i) {
          var _index = i % l;
          return color[_index];
        };
      }

      // fillColor is a single color
      // create an accessor function
      if (color) {
        return function (x) {return color;};
      }

      return function (x) {return '#007AFF';}; 
      // // if there are no fillcolors set, create a default range
      // tempScale =  d3.scale.linear()
      //                 .domain([1,inData.length])
      //                 .interpolate(d3.interpolateHcl)
      //                 .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]); // make this in line with the color we came from
    },

    /**
     * GetDataDimensions will inspect indata and see if the values section is an array, if so the data has multiple dimensions
     * @param  {Array} inData - The data that was set in the chart.data() getter (base.data())
     * @return {String}       - Description of type of data dimenstions DATATYPE_MULTIDIMENSIONAL | DATATYPE_UNIDIMENSIONAL
     */
    _getDataDimensions: function (inData) {
      var firstDataNode;

      if (_.isArray(inData)) {
        firstDataNode = _.first(inData);
        if (_.has(firstDataNode, 'values') && _.isArray(firstDataNode.values)) {
          return this.DATATYPE_MULTIDIMENSIONAL;
        }
      }
      return this.DATATYPE_UNIDIMENSIONAL;
    },


    /**
     * GetDataSchema extracts schema from inData
     * @param  {Array} inData - The data that was set in the chart.data() getter (base.data())
     * @return {String}       - object with schema that describes data columns
     */
    _getDataSchema: function (inData) {
      if (_.isArray(inData)) {
        return inData[0].columns;
      } else {
        return inData.columns;
      }
    },


    /**
     * A simple first iteration type caster.
     * @param  {object}   d   data object ({key: value})
     * @return {object}   d   data object ({key: value})
     */
    _typeCast: function(d) {
      var dateFormat
        , formatDate
        , schema = this.options.dataSchema;

        // loop trough schema column by column
      _.each(schema, function(column){

        // set date format
        if(column.type === 'date') {
          dateFormat = _.find(schema, function(column){ return column.type === 'date' && column.format; }).format;
          formatDate = d3.time.format(dateFormat);
          d[column.label] = formatDate.parse(d[column.label]);
        }

        // force number
        else if(column.type === 'number') {
          d[column.label] = +d[column.label];
        }
      });

      return d;
    },

    // wrapper for d3.format() -> https://github.com/mbostock/d3/wiki/Formatting
    formatNumber: function(value, format) {
      var formatter;

      // so that we can use convenience aliases
      switch(format) {
        case 'commaSeparator':
          format = ',';
          break;
        default:
          format = format;
      }

      formatter = d3.format(format);
      return formatter(value);
    },

  };
  return utils;
}
return BaseUtils();
}));
