# @spatial/destination

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## destination

Takes a [Point][1] and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the [Haversine formula][2] to account for global curvature.

### Parameters

-   `origin` **[Coord][3]** starting point
-   `distance` **[number][4]** distance from the origin point
-   `bearing` **[number][4]** ranging from -180 to 180
-   `options` **[Object][5]** Optional parameters (optional, default `{}`)
    -   `options.units` **[string][6]** miles, kilometers, degrees, or radians (optional, default `'kilometers'`)
    -   `options.properties` **[Object][5]** Translate properties to Point (optional, default `{}`)

### Examples

```javascript
var point = turf.point([-75.343, 39.984]);
var distance = 50;
var bearing = 90;
var options = {units: 'miles'};

var destination = turf.destination(point, distance, bearing, options);

//addToMap
var addToMap = [point, destination]
destination.properties['marker-color'] = '#f00';
point.properties['marker-color'] = '#0f0';
```

Returns **[Feature][7]&lt;[Point][8]>** destination point

[1]: https://tools.ietf.org/html/rfc7946#section-3.1.2

[2]: http://en.wikipedia.org/wiki/Haversine_formula

[3]: https://tools.ietf.org/html/rfc7946#section-3.1.1

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[7]: https://tools.ietf.org/html/rfc7946#section-3.2

[8]: https://tools.ietf.org/html/rfc7946#section-3.1.2

<!-- This file is automatically generated. Please don't edit it directly:
if you find an error, edit the source file (likely index.js), and re-run
./scripts/generate-readmes in the turf project. -->

---

This module is part of the [Turfjs project](http://turfjs.org/), an open source
module collection dedicated to geographic algorithms. It is maintained in the
[Turfjs/turf](https://github.com/Turfjs/turf) repository, where you can create
PRs and issues.

### Installation

Install this module individually:

```sh
$ npm install @spatial/destination
```

Or install the Turf module that includes it as a function:

```sh
$ npm install @turf/turf
```