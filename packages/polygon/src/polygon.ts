
import {
    isNumber,
    ICoordinates
} from '@spatial/utils';

import {
    feature,
    IFeatureOptions
} from '@spatial/feature';

/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
export function polygon<TProperties = any>(coordinates: Array<ICoordinates>, properties?: TProperties, options?: IFeatureOptions): GeoJSON.Feature<GeoJSON.Polygon, TProperties> {
    if (!coordinates) throw new Error('coordinates is required');

    for (let i = 0; i < coordinates.length; i++) {
        const ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (let j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (i === 0 && j === 0 && !isNumber(ring[0][0]) || !isNumber(ring[0][1])) throw new Error('coordinates must contain numbers');
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return <GeoJSON.Feature<GeoJSON.Polygon, TProperties>>feature({
        type: 'Polygon',
        coordinates
    }, properties, options);
}
