# @spatial/polygon-tangents

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## polygonTangents

Finds the tangents of a [(Multi)Polygon][1] from a [Point][2].

### Parameters

-   `pt` **[Coord][3]** to calculate the tangent points from
-   `polygon` **[Feature][4]&lt;([Polygon][5] \| [MultiPolygon][6])>** to get tangents from

### Examples

```javascript
var polygon = turf.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
var point = turf.point([61, 5]);

var tangents = turf.polygonTangents(point, polygon)

//addToMap
var addToMap = [tangents, point, polygon];
```

Returns **[FeatureCollection][7]&lt;[Point][8]>** Feature Collection containing the two tangent points

[1]: https://tools.ietf.org/html/rfc7946#section-3.1.6

[2]: https://tools.ietf.org/html/rfc7946#section-3.1.2

[3]: https://tools.ietf.org/html/rfc7946#section-3.1.1

[4]: https://tools.ietf.org/html/rfc7946#section-3.2

[5]: https://tools.ietf.org/html/rfc7946#section-3.1.6

[6]: https://tools.ietf.org/html/rfc7946#section-3.1.7

[7]: https://tools.ietf.org/html/rfc7946#section-3.3

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
$ npm install @spatial/polygon-tangents
```

Or install the Turf module that includes it as a function:

```sh
$ npm install @turf/turf
```