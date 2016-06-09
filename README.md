# d3by5-base-chart
The base class for all d3by5 charts. This base implements the shared functionality of graphs build acording to Mike Bostocks, [Towards Reusable Charts](https://bost.ocks.org/mike/chart/) using d3 v4.0

## API
* **width**  - the height of the chart (mandatory)
* **height** - the width of the chart (mandatory)
* **data**   - the data that produces the chart (optional, but no chart without it)
* **margin**
    will set margins on the chart, the input data can be
    * **Number** - (any valid Number)
    * **Array**  - an array of numbers, exactly 4 elements, 0 - top, 1 - right, 2 - bottom, 3 - left
    * **Object** - {top, right, bottom, left}

## Usage
Not really sure yet
