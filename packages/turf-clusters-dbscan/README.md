# @spatial/clusters-dbscan

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## clustersDbscan

Takes a set of [points][1] and partition them into clusters according to [https://en.wikipedia.org/wiki/DBSCAN][2] data clustering algorithm.

### Parameters

-   `points` **[FeatureCollection][3]&lt;[Point][4]>** to be clustered
-   `maxDistance` **[number][5]** Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
-   `options` **[Object][6]** Optional parameters (optional, default `{}`)
    -   `options.units` **[string][7]** in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers (optional, default `kilometers`)
    -   `options.minPoints` **[number][5]** Minimum number of points to generate a single cluster,
        points which do not meet this requirement will be classified as an 'edge' or 'noise'. (optional, default `3`)

### Examples

```javascript
// create random points with random z-values in their properties
var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
var maxDistance = 100;
var clustered = turf.clustersDbscan(points, maxDistance);

//addToMap
var addToMap = [clustered];
```

Returns **[FeatureCollection][3]&lt;[Point][4]>** Clustered Points with an additional two properties associated to each Feature:-   {number} cluster - the associated clusterId
-   {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')

[1]: https://tools.ietf.org/html/rfc7946#section-3.1.2

[2]: DBSCAN's

[3]: https://tools.ietf.org/html/rfc7946#section-3.3

[4]: https://tools.ietf.org/html/rfc7946#section-3.1.2

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

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
$ npm install @spatial/clusters-dbscan
```

Or install the Turf module that includes it as a function:

```sh
$ npm install @turf/turf
```