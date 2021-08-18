
import {
    Unit,
    UnitUtils
} from '@totalpave/math';

/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} distance
 */
export function radiansToLength(radians: number, units: Unit = Unit.KILOMETER): number {
    return UnitUtils.convert(radians, Unit.RADIAN, units);
}
