import { Unit } from '@totalpave/math';
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} radians
 */
export declare function lengthToRadians(distance: number, units?: Unit): number;
