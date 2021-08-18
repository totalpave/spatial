"use strict";
exports.__esModule = true;
exports.lengthToRadians = void 0;
var math_1 = require("@totalpave/math");
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = math_1.Unit.KILOMETER; }
    return math_1.UnitUtils.convert(distance, units, math_1.Unit.RADIAN);
}
exports.lengthToRadians = lengthToRadians;
//# sourceMappingURL=lengthToRadians.js.map