import { IGeometryOptions } from './IGeometryOptions';
import { ICoordinate, ICoordinates } from '@spatial/utils';
import { IGeometryType } from './IGeometryType';
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
export declare function geometry(type: IGeometryType, coordinates: ICoordinate | ICoordinates | Array<ICoordinates> | Array<Array<ICoordinates>>, options?: IGeometryOptions): GeoJSON.Geometry;
