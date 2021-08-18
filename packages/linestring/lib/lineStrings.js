"use strict";
exports.__esModule = true;
exports.lineStrings = void 0;
var feature_collection_1 = require("@spatial/feature-collection");
var lineString_1 = require("./lineString");
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<number>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (!coordinates)
        throw new Error('coordinates is required');
    if (!Array.isArray(coordinates))
        throw new Error('coordinates must be an Array');
    return feature_collection_1.featureCollection(coordinates.map(function (coords) { return lineString_1.lineString(coords, properties); }), options);
}
exports.lineStrings = lineStrings;
//# sourceMappingURL=lineStrings.js.map