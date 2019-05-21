import turfBBox from '@spatial/bbox';
import { getCoords, getType } from '@spatial/invariant';
import { polygon, multiPolygon, lineString, isObject } from '@spatial/helpers';

/**
 * Converts (Multi)LineString(s) to Polygon(s).
 *
 * @name lineToPolygon
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines Features to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @param {boolean} [options.autoComplete=true] auto complete linestrings (matches first & last coordinates)
 * @param {boolean} [options.orderCoords=true] sorts linestrings to place outer ring at the first position of the coordinates
 * @returns {Feature<Polygon|MultiPolygon>} converted to Polygons
 * @example
 * var line = turf.lineString([[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]);
 *
 * var polygon = turf.lineToPolygon(line);
 *
 * //addToMap
 * var addToMap = [polygon];
 */
function lineToPolygon(lines, options) {
    // Optional parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    const properties = options.properties;
    let autoComplete = options.autoComplete;
    let orderCoords = options.orderCoords;

    // validation
    if (!lines) throw new Error('lines is required');

    // default params
    autoComplete = (autoComplete !== undefined) ? autoComplete : true;
    orderCoords = (orderCoords !== undefined) ? orderCoords : true;
    const type = getType(lines);

    switch (type) {
    case 'FeatureCollection':
    case 'GeometryCollection':
        var coords = [];
        var features = (lines.features) ? lines.features : lines.geometries;
        features.forEach((line) => {
            coords.push(getCoords(lineStringToPolygon(line, {}, autoComplete, orderCoords)));
        });
        return multiPolygon(coords, properties);
    }
    return lineStringToPolygon(lines, properties, autoComplete, orderCoords);
}

/**
 * LineString to Polygon
 *
 * @private
 * @param {Feature<LineString|MultiLineString>} line line
 * @param {Object} [properties] translates GeoJSON properties to Feature
 * @param {boolean} [autoComplete=true] auto complete linestrings
 * @param {boolean} [orderCoords=true] sorts linestrings to place outer ring at the first position of the coordinates
 * @returns {Feature<Polygon>} line converted to Polygon
 */
function lineStringToPolygon(line, properties, autoComplete, orderCoords) {
    properties = properties || line.properties || {};
    let coords = getCoords(line);
    const type = getType(line);

    if (!coords.length) throw new Error('line must contain coordinates');

    switch (type) {
    case 'LineString':
        if (autoComplete) coords = autoCompleteCoords(coords);
        return polygon([coords], properties);
    case 'MultiLineString':
        var multiCoords = [];
        var largestArea = 0;

        coords.forEach((coord) => {
            if (autoComplete) coord = autoCompleteCoords(coord);

            // Largest LineString to be placed in the first position of the coordinates array
            if (orderCoords) {
                const area = calculateArea(turfBBox(lineString(coord)));
                if (area > largestArea) {
                    multiCoords.unshift(coord);
                    largestArea = area;
                } else multiCoords.push(coord);
            } else {
                multiCoords.push(coord);
            }
        });
        return polygon(multiCoords, properties);
    default:
        throw new Error(`geometry type ${  type  } is not supported`);
    }
}

/**
 * Auto Complete Coords - matches first & last coordinates
 *
 * @private
 * @param {Array<Array<number>>} coords Coordinates
 * @returns {Array<Array<number>>} auto completed coordinates
 */
function autoCompleteCoords(coords) {
    const first = coords[0];
    const x1 = first[0];
    const y1 = first[1];
    const last = coords[coords.length - 1];
    const x2 = last[0];
    const y2 = last[1];
    if (x1 !== x2 || y1 !== y2) {
        coords.push(first);
    }
    return coords;
}

/**
 * area - quick approximate area calculation (used to sort)
 *
 * @private
 * @param {Array<number>} bbox BBox [west, south, east, north]
 * @returns {number} very quick area calculation
 */
function calculateArea(bbox) {
    const west = bbox[0];
    const south = bbox[1];
    const east = bbox[2];
    const north = bbox[3];
    return Math.abs(west - east) * Math.abs(south - north);
}

export default lineToPolygon;
