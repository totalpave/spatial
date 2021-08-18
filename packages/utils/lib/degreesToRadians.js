"use strict";
exports.__esModule = true;
exports.degreesToRadians = void 0;
var math_1 = require("@totalpave/math");
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    return math_1.UnitUtils.convert(degrees, math_1.Unit.DEGREE, math_1.Unit.RADIAN);
}
exports.degreesToRadians = degreesToRadians;
//# sourceMappingURL=degreesToRadians.js.map