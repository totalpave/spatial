import { Unit, UnitUtils } from '@totalpave/math';

/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
export function radiansToDegrees(radians: number) {
    return UnitUtils.convert(radians, Unit.RADIAN, Unit.DEGREE);
}
