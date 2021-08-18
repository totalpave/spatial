
import {
    ICoordinate,
    IGeoJSONLike
} from '@spatial/utils'
import { IGeometryType } from '@spatial/geometry';

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */
export type ICoordEachCallback = (currentCoord: ICoordinate, coordIndex: number, featureIndex: number, multiFeatureIndex: number, geometryIndex: number) => void;

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
export function coordEach(geojson: IGeoJSONLike, callback: ICoordEachCallback, excludeWrapCoord?: boolean): void {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    let j: number, k: number, l: number, geometry: GeoJSON.Geometry, stopG: number, coords,
        geometryMaybeCollection: GeoJSON.Geometry | GeoJSON.GeometryCollection,
        wrapShrink: number = 0,
        coordIndex: number = 0,
        isGeometryCollection: boolean,
        type = geojson.type,
        isFeatureCollection: boolean = type === 'FeatureCollection',
        isFeature: boolean = type === 'Feature',
        stop: number = isFeatureCollection ? (<GeoJSON.FeatureCollection>geojson).features.length : 1;

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
    for (let featureIndex: number = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = (isFeatureCollection ? (<GeoJSON.FeatureCollection>geojson).features[featureIndex].geometry :
            (isFeature ? (<GeoJSON.Feature>geojson).geometry : <GeoJSON.Geometry>geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? (<GeoJSON.GeometryCollection>geometryMaybeCollection).geometries.length : 1;

        for (let geomIndex: number = 0; geomIndex < stopG; geomIndex++) {
            let multiFeatureIndex: number = 0;
            let geometryIndex: number = 0;
            geometry = isGeometryCollection ?
            (<GeoJSON.GeometryCollection>geometryMaybeCollection).geometries[geomIndex] : <GeoJSON.Geometry>geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = (<any>geometry).coordinates; //IDK why typescript was complaining, it thinks geometry is a GeometryCollection, regardless if I type assert it to Geometry.
            const geomType: IGeometryType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

            switch (geomType) {
            case null:
                break;
            case 'Point':
                callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
                coordIndex++;
                multiFeatureIndex++;
                break;
            case 'LineString':
            case 'MultiPoint':
                for (j = 0; j < coords.length; j++) {
                    callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
                    coordIndex++;
                    if (geomType === 'MultiPoint') multiFeatureIndex++;
                }
                if (geomType === 'LineString') multiFeatureIndex++;
                break;
            case 'Polygon':
            case 'MultiLineString':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
                        coordIndex++;
                    }
                    if (geomType === 'MultiLineString') multiFeatureIndex++;
                    if (geomType === 'Polygon') geometryIndex++;
                }
                if (geomType === 'Polygon') multiFeatureIndex++;
                break;
            case 'MultiPolygon':
                for (j = 0; j < coords.length; j++) {
                    if (geomType === 'MultiPolygon') geometryIndex = 0;
                    for (k = 0; k < coords[j].length; k++) {
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
                            coordIndex++;
                        }
                        geometryIndex++;
                    }
                    multiFeatureIndex++;
                }
                break;
            case 'GeometryCollection':
                for (j = 0; j < (<GeoJSON.GeometryCollection>geometry).geometries.length; j++)
                    coordEach((<GeoJSON.GeometryCollection>geometry).geometries[j], callback, excludeWrapCoord);
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}
