"use strict";
exports.__esModule = true;
exports.feature = void 0;
var utils_1 = require("@spatial/utils");
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geometry, properties, options) {
    // Optional Parameters
    options = options || {};
    if (!utils_1.isObject(options))
        throw new Error('options is invalid');
    var bbox = options.bbox;
    var id = options.id;
    // Validation
    if (geometry === undefined)
        throw new Error('geometry is required');
    if (properties && properties.constructor !== Object)
        throw new Error('properties must be an Object');
    if (bbox)
        utils_1.validateBBox(bbox);
    if (id)
        utils_1.validateId(id);
    // Main
    var feat = { type: 'Feature' };
    if (id)
        feat.id = id;
    if (bbox)
        feat.bbox = bbox;
    feat.properties = properties || {};
    feat.geometry = geometry;
    return feat;
}
exports.feature = feature;
//# sourceMappingURL=feature.js.map