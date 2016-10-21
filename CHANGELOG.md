# Change Log
All notable changes to this project will be documented in this file.
This project adheres (well, maybe not quite) to [Semantic Versioning](http://semver.org/).




## [UNRELEASED]
### Added
- Added README with initial API definition
- Added base class 'index.js' with the first raw object
- Added package.json
- Can now add margins to a chart via setter
- Can remove all graphs calling base.remove()
- Can get height and width with subtracted margins
- Added axis as a dependency

### Changed
- Renamed index.js to d3by5-base-graphs
- Refactored _parseData to enable easier overwriting of parts of the properties
- Refactored into baseUtils where all utilities are found


[//]: ##############################################
<!---
[//]: # (Legend)
[Added]:        <> (for new features.)
[Changed]:      <> (for changes in existing functionality.)
[Deprecated]:   <> (for once-stable features removed in upcoming releases.)
[Removed]:      <> (for deprecated features removed in this release.)
[Fixed]:        <> (for any bug fixes.)
[Security]:     <> (to invite users to upgrade in case of vulnerabilities.)
--->