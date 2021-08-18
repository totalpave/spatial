
import { Unit } from '@totalpave/math';
import {lengthToRadians} from './lengthToRadians';
import {radiansToDegrees} from './radiansToDegrees';

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} degrees
 */
export function lengthToDegrees(distance: number, units: Unit = Unit.KILOMETER): number {
    return radiansToDegrees(lengthToRadians(distance, units));
}
