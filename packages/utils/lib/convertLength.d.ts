import { Unit } from '@totalpave/math';
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Unit} originalUnit of the length
 * @param {Unit} [finalUnit=Unit.KILOMETER] returned unit
 * @returns {number} the converted length
 */
export declare function convertLength(length: number, originalUnit: Unit, finalUnit?: Unit): number;
