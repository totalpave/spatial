
import {coordEach} from './coordEach';

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
export function coordAll(geojson: GeoJSON.FeatureCollection | GeoJSON.Feature | GeoJSON.Geometry): Array<Array<number>> {
    const coords: Array<Array<number>> = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}
