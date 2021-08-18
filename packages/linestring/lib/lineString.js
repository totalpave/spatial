"use strict";
exports.__esModule = true;
exports.lineString = void 0;
var utils_1 = require("@spatial/utils");
var feature_1 = require("@spatial/feature");
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (!coordinates)
        throw new Error('coordinates is required');
    if (coordinates.length < 2)
        throw new Error('coordinates must be an array of two or more positions');
    // Check if first point of LineString contains two numbers
    if (!utils_1.isNumber(coordinates[0][1]) || !utils_1.isNumber(coordinates[0][1]))
        throw new Error('coordinates must contain numbers');
    return feature_1.feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties, options);
}
exports.lineString = lineString;
//# sourceMappingURL=lineString.js.map