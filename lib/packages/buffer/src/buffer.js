"use strict";
exports.__esModule = true;
exports.buffer = void 0;
var center_1 = require("@spatial/center");
var bbox_1 = require("@spatial/bbox");
var turf_jsts_1 = require("turf-jsts");
var projection_1 = require("@spatial/projection");
var meta_1 = require("@spatial/meta");
var d3_geo_1 = require("d3-geo");
var helpers_1 = require("@spatial/helpers");
/**
 * Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
 *
 * When using a negative radius, the resulting geometry may be invalid if
 * it's too small compared to the radius magnitude. If the input is a
 * FeatureCollection, only valid members will be returned in the output
 * FeatureCollection - i.e., the output collection may have fewer members than
 * the input, or even be empty.
 *
 * @name buffer
 * @param {FeatureCollection|Geometry|Feature<any>} geojson input to be buffered
 * @param {number} radius distance to draw the buffer (negative values are allowed)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] any of the options supported by turf units
 * @param {number} [options.steps=64] number of steps
 * @returns {FeatureCollection|Feature<Polygon|MultiPolygon>|undefined} buffered features
 * @example
 * var point = turf.point([-90.548630, 14.616599]);
 * var buffered = turf.buffer(point, 500, {units: 'miles'});
 *
 * //addToMap
 * var addToMap = [point, buffered]
 */
function buffer(geojson, radius, options) {
    // Optional params
    options = options || {};
    var units = options.units;
    var steps = options.steps || 64;
    // validation
    if (!geojson)
        throw new Error('geojson is required');
    if (typeof options !== 'object')
        throw new Error('options must be an object');
    if (typeof steps !== 'number')
        throw new Error('steps must be an number');
    // Allow negative buffers ("erosion") or zero-sized buffers ("repair geometry")
    if (radius === undefined)
        throw new Error('radius is required');
    if (steps <= 0)
        throw new Error('steps must be greater than 0');
    // default params
    steps = steps || 64;
    units = units || 'kilometers';
    var results = [];
    switch (geojson.type) {
        case 'GeometryCollection':
            meta_1.geomEach(geojson, function (geometry) {
                var buffered = bufferFeature(geometry, radius, units, steps);
                if (buffered)
                    results.push(buffered);
            });
            return helpers_1.featureCollection(results);
        case 'FeatureCollection':
            meta_1.featureEach(geojson, function (feature) {
                var multiBuffered = bufferFeature(feature, radius, units, steps);
                if (multiBuffered) {
                    meta_1.featureEach(multiBuffered, function (buffered) {
                        if (buffered)
                            results.push(buffered);
                    });
                }
            });
            return helpers_1.featureCollection(results);
    }
    return bufferFeature(geojson, radius, units, steps);
}
exports.buffer = buffer;
/**
 * Buffer single Feature/Geometry
 *
 * @private
 * @param {Feature<any>} geojson input to be buffered
 * @param {number} radius distance to draw the buffer
 * @param {string} [units='kilometers'] any of the options supported by turf units
 * @param {number} [steps=64] number of steps
 * @returns {Feature<Polygon|MultiPolygon>} buffered feature
 */
function bufferFeature(geojson, radius, units, steps) {
    var properties = geojson.properties || {};
    var geometry = (geojson.type === 'Feature') ? geojson.geometry : geojson;
    // Geometry Types faster than jsts
    if (geometry.type === 'GeometryCollection') {
        var results_1 = [];
        meta_1.geomEach(geojson, function (geometry) {
            var buffered = bufferFeature(geometry, radius, units, steps);
            if (buffered)
                results_1.push(buffered);
        });
        return helpers_1.featureCollection(results_1);
    }
    // Project GeoJSON to Transverse Mercator projection (convert to Meters)
    var projected;
    var bbox = bbox_1["default"](geojson);
    var needsTransverseMercator = bbox[1] > 50 && bbox[3] > 50;
    if (needsTransverseMercator) {
        projected = {
            type: geometry.type,
            coordinates: projectCoords(geometry.coordinates, defineProjection(geometry))
        };
    }
    else {
        projected = projection_1.toMercator(geometry);
    }
    // JSTS buffer operation
    var reader = new turf_jsts_1.GeoJSONReader();
    var geom = reader.read(projected);
    var distance = helpers_1.radiansToLength(helpers_1.lengthToRadians(radius, units), 'meters');
    var buffered = turf_jsts_1.BufferOp.bufferOp(geom, distance);
    var writer = new turf_jsts_1.GeoJSONWriter();
    buffered = writer.write(buffered);
    // Detect if empty geometries
    if (coordsIsNaN(buffered.coordinates))
        return undefined;
    // Unproject coordinates (convert to Degrees)
    var result;
    if (needsTransverseMercator) {
        result = {
            type: buffered.type,
            coordinates: unprojectCoords(buffered.coordinates, defineProjection(geometry))
        };
    }
    else {
        result = projection_1.toWgs84(buffered);
    }
    return (result.geometry) ? result : helpers_1.feature(result, properties);
}
/**
 * Coordinates isNaN
 *
 * @private
 * @param {Array<any>} coords GeoJSON Coordinates
 * @returns {boolean} if NaN exists
 */
function coordsIsNaN(coords) {
    if (Array.isArray(coords[0]))
        return coordsIsNaN(coords[0]);
    return isNaN(coords[0]);
}
/**
 * Project coordinates to projection
 *
 * @private
 * @param {Array<any>} coords to project
 * @param {GeoProjection} proj D3 Geo Projection
 * @returns {Array<any>} projected coordinates
 */
function projectCoords(coords, proj) {
    if (typeof coords[0] !== 'object')
        return proj(coords);
    return coords.map(function (coord) { return projectCoords(coord, proj); });
}
/**
 * Un-Project coordinates to projection
 *
 * @private
 * @param {Array<any>} coords to un-project
 * @param {GeoProjection} proj D3 Geo Projection
 * @returns {Array<any>} un-projected coordinates
 */
function unprojectCoords(coords, proj) {
    if (typeof coords[0] !== 'object')
        return proj.invert(coords);
    return coords.map(function (coord) { return unprojectCoords(coord, proj); });
}
/**
 * Define Transverse Mercator projection
 *
 * @private
 * @param {Geometry|Feature<any>} geojson Base projection on center of GeoJSON
 * @returns {GeoProjection} D3 Geo Transverse Mercator Projection
 */
function defineProjection(geojson) {
    var coords = center_1["default"](geojson).geometry.coordinates.reverse();
    var rotate = coords.map(function (coord) { return -coord; });
    return d3_geo_1.geoTransverseMercator()
        .center(coords)
        .rotate(rotate)
        .scale(helpers_1.earthRadius);
}
//# sourceMappingURL=buffer.js.map