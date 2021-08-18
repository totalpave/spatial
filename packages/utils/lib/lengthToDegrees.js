"use strict";
exports.__esModule = true;
exports.lengthToDegrees = void 0;
var math_1 = require("@totalpave/math");
var lengthToRadians_1 = require("./lengthToRadians");
var radiansToDegrees_1 = require("./radiansToDegrees");
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {Unit} [units=Unit.KILOMETER]
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    if (units === void 0) { units = math_1.Unit.KILOMETER; }
    return radiansToDegrees_1.radiansToDegrees(lengthToRadians_1.lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
//# sourceMappingURL=lengthToDegrees.js.map