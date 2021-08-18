"use strict";
exports.__esModule = true;
exports.multiLineString = void 0;
var feature_1 = require("@spatial/feature");
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (!coordinates)
        throw new Error('coordinates is required');
    return feature_1.feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties, options);
}
exports.multiLineString = multiLineString;
//# sourceMappingURL=multiLineString.js.map