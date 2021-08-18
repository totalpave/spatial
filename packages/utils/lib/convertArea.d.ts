import { Unit } from '@totalpave/math';
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Unit} [originalUnit='meters'] of the distance
 * @param {Unit} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted distance
 */
export declare function convertArea(area: number, originalUnit?: Unit, finalUnit?: Unit): number;
