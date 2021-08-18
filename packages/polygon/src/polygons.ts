
import {
    ICoordinates
} from '@spatial/utils';
import {
    IFeatureOptions
} from '@spatial/feature';
import {
    featureCollection
} from '@spatial/feature-collection';
import {polygon} from './polygon';

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
export function polygons<TProperties = any>(coordinates: Array<Array<ICoordinates>>, properties?: TProperties, options?: IFeatureOptions): GeoJSON.FeatureCollection<GeoJSON.Polygon, TProperties> {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return <GeoJSON.FeatureCollection<GeoJSON.Polygon, TProperties>>featureCollection(coordinates.map(function (coords) { return polygon<TProperties>(coords, properties); }), options);
}