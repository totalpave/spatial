import { ICoordinate } from '@spatial/utils';
import { IFeatureOptions } from '@spatial/feature';
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
export declare function point<TProperties = any>(coordinates: ICoordinate, properties?: TProperties, options?: IFeatureOptions): import("geojson").Feature<import("geojson").Geometry, {
    [name: string]: any;
}>;
