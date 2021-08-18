
import { Unit, UnitUtils } from '@totalpave/math';

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} radians
 */
export function lengthToRadians(distance: number, units: Unit = Unit.KILOMETER): number {
    return UnitUtils.convert(distance, units, Unit.RADIAN);
}
