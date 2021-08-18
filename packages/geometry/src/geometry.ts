
import {IGeometryOptions} from './IGeometryOptions';
import {
    isObject,
    validateBBox,
    ICoordinate,
    ICoordinates
} from '@spatial/utils';
import {point, multiPoint} from '@spatial/point';
import {lineString, multiLineString} from '@spatial/linestring';
import {polygon, multiPolygon} from '@spatial/polygon';
import {IGeometryType} from './IGeometryType';

/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<number>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Geometry
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = 'Point';
 * var coordinates = [110, 50];
 *
 * var geometry = turf.geometry(type, coordinates);
 *
 * //=geometry
 */
export function geometry(type: IGeometryType, coordinates: ICoordinate | ICoordinates | Array<ICoordinates> | Array<Array<ICoordinates>>, options?: IGeometryOptions): GeoJSON.Geometry {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    const bbox = options.bbox;

    // Validation
    if (!type) throw new Error('type is required');
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
    if (bbox) validateBBox(bbox);

    // Main
    let geom;
    switch (type) {
    case 'Point': geom = point(<ICoordinate>coordinates).geometry; break;
    case 'LineString': geom = lineString(<ICoordinates>coordinates).geometry; break;
    case 'Polygon': geom = polygon(<Array<ICoordinates>>coordinates).geometry; break;
    case 'MultiPoint': geom = multiPoint(<ICoordinates>coordinates).geometry; break;
    case 'MultiLineString': geom = multiLineString(<Array<ICoordinates>>coordinates).geometry; break;
    case 'MultiPolygon': geom = multiPolygon(<Array<Array<ICoordinates>>>coordinates).geometry; break;
    default: throw new Error(`${type} is invalid`);
    }
    if (bbox) geom.bbox = bbox;
    return geom;
}
