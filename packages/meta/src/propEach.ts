

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */
export type IPropEachCallback<TProperties = any> = (currentProperties: TProperties, featureIndex: number) => void;

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
export function propEach<TProperties = any>(geojson: GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>, callback: IPropEachCallback<TProperties>): void {
    let i: number;
    switch (geojson.type) {
    case 'FeatureCollection':
        for (i = 0; i < geojson.features.length; i++) {
            callback((<GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>>geojson).features[i].properties, i);
        }
        break;
    case 'Feature':
        callback((<GeoJSON.Feature<GeoJSON.Geometry, TProperties>>geojson).properties, 0);
        break;
    }
}
