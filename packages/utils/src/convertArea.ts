
import { Unit, UnitUtils } from '@totalpave/math';

/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Unit} [originalUnit='meters'] of the distance
 * @param {Unit} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted distance
 */
export function convertArea(area: number, originalUnit: Unit = Unit.METER, finalUnit: Unit = Unit.KILOMETER): number {
    return UnitUtils.convert(area, originalUnit, finalUnit);
}
