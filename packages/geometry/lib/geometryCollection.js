"use strict";
exports.__esModule = true;
exports.geometryCollection = void 0;
var api_1 = require("../../point/node_modules/@spatial/feature/lib/api");
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = {
 *     "type": "Point",
 *       "coordinates": [100, 0]
 *     };
 * var line = {
 *     "type": "LineString",
 *     "coordinates": [ [101, 0], [102, 1] ]
 *   };
 * var collection = turf.geometryCollection([pt, line]);
 *
 * //=collection
 */
function geometryCollection(geometries, properties, options) {
    if (!geometries)
        throw new Error('geometries is required');
    if (!Array.isArray(geometries))
        throw new Error('geometries must be an Array');
    return api_1.feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties, options);
}
exports.geometryCollection = geometryCollection;
//# sourceMappingURL=geometryCollection.js.map