"use strict";
exports.__esModule = true;
exports.featureCollection = void 0;
var utils_1 = require("@spatial/utils");
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    // Optional Parameters
    options = options || {};
    if (!utils_1.isObject(options))
        throw new Error('options is invalid');
    var bbox = options.bbox;
    var id = options.id;
    // Validation
    if (!features)
        throw new Error('No features passed');
    if (!Array.isArray(features))
        throw new Error('features must be an Array');
    if (bbox)
        utils_1.validateBBox(bbox);
    if (id)
        utils_1.validateId(id);
    // Main
    var fc = { type: 'FeatureCollection' };
    if (id)
        fc.id = id; // id doesn't appear to be allowed on featureCollections according to GeoJSON spec, but to avoid breaking changes... we'd keep it
    if (bbox)
        fc.bbox = bbox;
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
//# sourceMappingURL=featureCollection.js.map