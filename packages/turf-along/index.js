import bearing from '@spatial/bearing';
import destination from '@spatial/destination';
import measureDistance from '@spatial/distance';
import { point, isNumber, isObject } from '@spatial/helpers';

/**
 * Takes a {@link LineString} and returns a {@link Point} at a specified distance along the line.
 *
 * @name along
 * @param {Feature<LineString>} line input line
 * @param {number} distance distance along the line
 * @param {Object} [options] Optional parameters
 * @param {string} [options.units="kilometers"] can be degrees, radians, miles, or kilometers
 * @returns {Feature<Point>} Point `distance` `units` along the line
 * @example
 * var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]]);
 * var options = {units: 'miles'};
 *
 * var along = turf.along(line, 200, options);
 *
 * //addToMap
 * var addToMap = [along, line]
 */
function along(line, distance, options) {
    // Optional parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');

    // Validation
    let coords;
    if (line.type === 'Feature') coords = line.geometry.coordinates;
    else if (line.type === 'LineString') coords = line.coordinates;
    else throw new Error('input must be a LineString Feature or Geometry');
    if (!isNumber(distance)) throw new Error('distance must be a number');

    let travelled = 0;
    for (let i = 0; i < coords.length; i++) {
        if (distance >= travelled && i === coords.length - 1) break;
        else if (travelled >= distance) {
            const overshot = distance - travelled;
            if (!overshot) return point(coords[i]);
            else {
                const direction = bearing(coords[i], coords[i - 1]) - 180;
                const interpolated = destination(coords[i], overshot, direction, options);
                return interpolated;
            }
        } else {
            travelled += measureDistance(coords[i], coords[i + 1], options);
        }
    }
    return point(coords[coords.length - 1]);
}

export default along;
