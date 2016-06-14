# d3by5-base-chart
The base class for all d3by5 charts. This base implements the shared functionality of graphs build acording to Mike Bostocks, [Towards Reusable Charts](https://bost.ocks.org/mike/chart/)

All methods operate as getters/setters. Providing a value will set it and return the chart object for chaining. Calling the method without arguments will return the current value

## API
### Required values
* **width**  - {Number} - the height of the chart (required)
* **height** - {Number} - the width of the chart (required)
* **data**   - {Array} - the data that produces the chart (required)

### Optional values
* **fillColor** - {Mixed} - sets the fillcolor for a chart, this can be an Array of hex-strings/named colors or a single hex-string/named color
* **margin** - {Mixed}
    will set margins on the chart, the input data can be
    * **Number** - Any valid number following css standard settings, can be 1, 2, 3 or 4 numbers separated by ,
    * **Object** - {top, right, bottom, left}
* **padding** - {Number} - sets the padding, no real use for this value yet
* **on** - {String, Function} - sets a listener all supported dom events

## Utilities
* **remove** - removes the chart from stage
* **_createMargins** - used by **margin** to create valid object (top, left, bottom, right)
* **_parseData** - entry point for dataparsing, used by **data** and implements **_getColorAccessor**,  **_mapData** and **_getDataDimensions**
* **_mapData** - dafault mapping of data to valid format
* **_getColorAccessor** - created a color accessor function for setting colors
* **_getDataDimensions** - checks the layout of data (if single or multiple dimensions)


## License
[MIT](https://opensource.org/licenses/MIT)
