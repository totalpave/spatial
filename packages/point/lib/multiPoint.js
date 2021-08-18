"use strict";
exports.__esModule = true;
exports.multiPoint = void 0;
var feature_1 = require("@spatial/feature");
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (!coordinates)
        throw new Error('coordinates is required');
    return feature_1.feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties, options);
}
exports.multiPoint = multiPoint;
//# sourceMappingURL=multiPoint.js.map