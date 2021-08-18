import { Unit } from '@totalpave/math';
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} degrees
 */
export declare function lengthToDegrees(distance: number, units?: Unit): number;
