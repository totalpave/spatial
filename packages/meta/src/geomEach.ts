
import { IBBox } from '@spatial/utils';

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */
export type IGeomEachCallback<TProperties = any> = (currentGeometry: GeoJSON.Geometry, featureIndex: number, featureProperties: TProperties, featureBBox: IBBox, featureId: number | string) => void;

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
export function geomEach<TProperties = any>(geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties> | GeoJSON.Feature<GeoJSON.Geometry, TProperties> | GeoJSON.Geometry, callback: IGeomEachCallback): void {
    let i: number, j: number, g: number, geometry: GeoJSON.Geometry, stopG: number,
        geometryMaybeCollection,
        isGeometryCollection: boolean,
        featureProperties: Partial<TProperties>,
        featureBBox: IBBox,
        featureId: number | string,
        featureIndex: number = 0,
        isFeatureCollection: boolean = geojson.type === 'FeatureCollection',
        isFeature: boolean = geojson.type === 'Feature',
        stop: number = isFeatureCollection ? (<GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>>geojson).features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = (isFeatureCollection ? (<GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>>geojson).features[i].geometry :
            (isFeature ? (<GeoJSON.Feature<GeoJSON.Geometry, TProperties>>geojson).geometry : geojson));
        featureProperties = (isFeatureCollection ? (<GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>>geojson).features[i].properties :
            (isFeature ? (<GeoJSON.Feature<GeoJSON.Geometry, TProperties>>geojson).properties : {}));
        featureBBox = (isFeatureCollection ? (<GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>>geojson).features[i].bbox :
            (isFeature ? (<GeoJSON.Feature<GeoJSON.Geometry, TProperties>>geojson).bbox : undefined));
        featureId = (isFeatureCollection ? (<GeoJSON.FeatureCollection<GeoJSON.Geometry, TProperties>>geojson).features[i].id :
            (isFeature ? (<GeoJSON.Feature<GeoJSON.Geometry, TProperties>>geojson).id : undefined));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? (<GeoJSON.GeometryCollection>geometryMaybeCollection).geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = <GeoJSON.Geometry>(isGeometryCollection ?
                (<GeoJSON.GeometryCollection>geometryMaybeCollection).geometries[g] : geometryMaybeCollection);

            // Handle null Geometry
            if (geometry === null) {
                callback(null, featureIndex, featureProperties, featureBBox, featureId);
                continue;
            }
            switch (geometry.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
                callback(geometry, featureIndex, featureProperties, featureBBox, featureId);
                break;
            }
            case 'GeometryCollection': {
                for (j = 0; j < geometry.geometries.length; j++) {
                    callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId);
                }
                break;
            }
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
    }
}