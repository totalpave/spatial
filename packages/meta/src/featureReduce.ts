
import {featureEach} from './featureEach';

/**
 * Callback for featureReduce
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
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */
export type IFeatureReduceCallback<TProperties = any> = (previousValue: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, currentFeature: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, featureIndex: number) => GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>;

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
export function featureReduce<TProperties = any>(geojson: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, callback: IFeatureReduceCallback<TProperties>, initialValue: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>): GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> {
    let previousValue: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> = initialValue;
    featureEach<TProperties>(geojson, function (currentFeature: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, featureIndex: number) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}
