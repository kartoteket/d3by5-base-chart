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
- Added a new set of base utils
- Added support for theming
- Add method for retrieving events matching a pattern


### Changed
- Moved index.js to src/js/base-chart and added UMD loading
- Refactored _parseData to enable easier overwriting of parts of the properties
- Refactored into baseUtils where all utilities are found
- Moved baseUtils to src/js/base-chart-utils and added UMD loading

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