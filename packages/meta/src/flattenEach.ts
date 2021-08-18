
import {geomEach} from './geomEach';
import {feature} from '@spatial/feature';

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */
export type IFlattenEachCallback<TProperties = any> = (currentFeature: GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry, featureIndex: number, multiFeatureIndex: number) => void;

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
export function flattenEach<TProperties = any>(geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry, callback: IFlattenEachCallback<TProperties>): void {
    geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
        // Callback for single geometry
        const type: string = (geometry === null) ? null : geometry.type;
        switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
            callback(feature<TProperties>(geometry, properties, {bbox, id}), featureIndex, 0);
            return;
        }

        let geomType: string;

        // Callback for multi-geometry
        switch (type) {
        case 'MultiPoint':
            geomType = 'Point';
            break;
        case 'MultiLineString':
            geomType = 'LineString';
            break;
        case 'MultiPolygon':
            geomType = 'Polygon';
            break;
        }

        geometry.coordinates.forEach(function (coordinate, multiFeatureIndex) {
            const geom = {
                type: geomType,
                coordinates: coordinate
            };
            callback(feature(geom, properties), featureIndex, multiFeatureIndex);
        });

    });
}