"use strict";
exports.__esModule = true;
exports.radiansToLength = void 0;
var math_1 = require("@totalpave/math");
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {Unit} [units='kilometers']
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = math_1.Unit.KILOMETER; }
    return math_1.UnitUtils.convert(radians, math_1.Unit.RADIAN, units);
}
exports.radiansToLength = radiansToLength;
//# sourceMappingURL=radiansToLength.js.map