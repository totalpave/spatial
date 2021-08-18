"use strict";
exports.__esModule = true;
exports.point = void 0;
var utils_1 = require("@spatial/utils");
var feature_1 = require("@spatial/feature");
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (!coordinates)
        throw new Error('coordinates is required');
    if (!Array.isArray(coordinates))
        throw new Error('coordinates must be an Array');
    if (coordinates.length < 2)
        throw new Error('coordinates must be at least 2 numbers long');
    if (!utils_1.isNumber(coordinates[0]) || !utils_1.isNumber(coordinates[1]))
        throw new Error('coordinates must contain numbers');
    return feature_1.feature({
        type: 'Point',
        coordinates: coordinates
    }, properties, options);
}
exports.point = point;
//# sourceMappingURL=point.js.map