
import { IBBox } from '@spatial/utils';
import {geomEach} from './geomEach';

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */
export type IGeomReduceCallback<TProperties = any> = (previousValue: GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry, currentGeometry: GeoJSON.Geometry, featureIndex: number, featureProperties: TProperties, featureBBox: IBBox, featureId: number | string) => GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry;

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
export function geomReduce<TProperties = any>(geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry, callback: IGeomReduceCallback<TProperties>, initialValue: GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry): GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry {
    let previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;
        else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
    });
    return previousValue;
}
