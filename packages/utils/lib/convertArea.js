"use strict";
exports.__esModule = true;
exports.convertArea = void 0;
var math_1 = require("@totalpave/math");
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Unit} [originalUnit='meters'] of the distance
 * @param {Unit} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = math_1.Unit.METER; }
    if (finalUnit === void 0) { finalUnit = math_1.Unit.KILOMETER; }
    return math_1.UnitUtils.convert(area, originalUnit, finalUnit);
}
exports.convertArea = convertArea;
//# sourceMappingURL=convertArea.js.map