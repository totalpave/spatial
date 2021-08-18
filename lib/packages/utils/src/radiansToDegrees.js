"use strict";
exports.__esModule = true;
exports.radiansToDegrees = void 0;
var math_1 = require("@totalpave/math");
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    return math_1.UnitUtils.convert(radians, math_1.Unit.RADIAN, math_1.Unit.DEGREE);
}
exports.radiansToDegrees = radiansToDegrees;
//# sourceMappingURL=radiansToDegrees.js.map