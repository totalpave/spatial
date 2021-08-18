"use strict";
exports.__esModule = true;
exports.geometry = void 0;
var utils_1 = require("@spatial/utils");
var point_1 = require("@spatial/point");
var linestring_1 = require("@spatial/linestring");
var polygon_1 = require("@spatial/polygon");
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<number>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Geometry
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = 'Point';
 * var coordinates = [110, 50];
 *
 * var geometry = turf.geometry(type, coordinates);
 *
 * //=geometry
 */
function geometry(type, coordinates, options) {
    // Optional Parameters
    options = options || {};
    if (!utils_1.isObject(options))
        throw new Error('options is invalid');
    var bbox = options.bbox;
    // Validation
    if (!type)
        throw new Error('type is required');
    if (!coordinates)
        throw new Error('coordinates is required');
    if (!Array.isArray(coordinates))
        throw new Error('coordinates must be an Array');
    if (bbox)
        utils_1.validateBBox(bbox);
    // Main
    var geom;
    switch (type) {
        case 'Point':
            geom = point_1.point(coordinates).geometry;
            break;
        case 'LineString':
            geom = linestring_1.lineString(coordinates).geometry;
            break;
        case 'Polygon':
            geom = polygon_1.polygon(coordinates).geometry;
            break;
        case 'MultiPoint':
            geom = point_1.multiPoint(coordinates).geometry;
            break;
        case 'MultiLineString':
            geom = linestring_1.multiLineString(coordinates).geometry;
            break;
        case 'MultiPolygon':
            geom = polygon_1.multiPolygon(coordinates).geometry;
            break;
        default: throw new Error(type + " is invalid");
    }
    if (bbox)
        geom.bbox = bbox;
    return geom;
}
exports.geometry = geometry;
//# sourceMappingURL=geometry.js.map