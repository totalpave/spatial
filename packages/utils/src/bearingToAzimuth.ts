
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
export function bearingToAzimuth(bearing: number): number {
    if (bearing === null || bearing === undefined) throw new Error('bearing is required');

    let angle: number = bearing % 360;
    if (angle < 0) angle += 360;
    return angle;
}
