"use strict";
exports.__esModule = true;
exports.polygons = void 0;
var feature_collection_1 = require("@spatial/feature-collection");
var polygon_1 = require("./polygon");
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (!coordinates)
        throw new Error('coordinates is required');
    if (!Array.isArray(coordinates))
        throw new Error('coordinates must be an Array');
    return feature_collection_1.featureCollection(coordinates.map(function (coords) { return polygon_1.polygon(coords, properties); }), options);
}
exports.polygons = polygons;
//# sourceMappingURL=polygons.js.map