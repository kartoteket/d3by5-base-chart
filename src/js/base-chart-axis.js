/*!
 * Base charts
 *
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['d3'] , factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('d3'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.d3);
    }
}(this, function (d3) {

'use:strict';

/**
 * The entrypoint
 * @return {[type]} [description]
 */
function Axis () {

  var show
    , pos
    , scale
    , ticks
    , align
  ;



  function axis() {
    if(show) {
      return d3.svg.axis()
              .scale(scale)
              .orient(align)
              .ticks(ticks.count)
              .tickFormat(ticks.format);
    }
    return false;
  }

  /**
   * getter/setters
   */
    axis.show = function (value) {
      return arguments.length ? (show = value, axis) : show;
    };
    axis.pos = function (value) {
      return arguments.length ? (pos = value, axis) : pos;
    };
    axis.scale = function (value) {
      return arguments.length ? (scale = value, axis) : scale;
    };
    axis.ticks = function (value) {
      return arguments.length ? (ticks = _parseTicks(value), axis) : ticks;
    };
    axis.align = function (value) {
      return arguments.length ? (align = value, axis) : align;
    };




    /**
     * Parse tick options before use
     * @param  {object} ticks {count, format}
     * @return {object}       {count, format}
     */
    function _parseTicks(ticks){

      var count = ticks[0]
        , format = ticks[1];

      switch(count) {
        case 'auto':
          count = null;
          break;
        case 'none':
          count = 0;
          break;
        default:
          count = +count;
          break;
      }

      // TODO: Handfe more formats that just date/time
      switch(format) {
        case undefined:
        case 'auto':
          format = null;
          break;
        default:
          format = d3.time.format(format);
          break;
      }

      return {count:count, format:format};
    }

    return axis;
  }
  return Axis;
}));