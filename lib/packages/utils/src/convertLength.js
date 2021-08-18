"use strict";
exports.__esModule = true;
exports.convertLength = void 0;
var math_1 = require("@totalpave/math");
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Unit} originalUnit of the length
 * @param {Unit} [finalUnit=Unit.KILOMETER] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (finalUnit === void 0) { finalUnit = math_1.Unit.KILOMETER; }
    return math_1.UnitUtils.convert(length, originalUnit, finalUnit);
}
exports.convertLength = convertLength;
//# sourceMappingURL=convertLength.js.map