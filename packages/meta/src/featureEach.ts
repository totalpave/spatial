
/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */
export type IFeatureEachCallback<TProperties = any> = (currentFeature: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, featureIndex: number) => void;

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
export function featureEach<TProperties = any>(geojson: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, callback: IFeatureEachCallback): void {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (let i: number = 0; i < geojson.features.length; i++) {
            callback(geojson.features[i], i);
        }
    }
}
