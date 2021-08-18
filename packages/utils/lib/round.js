"use strict";
exports.__esModule = true;
exports.round = void 0;
var math_1 = require("@totalpave/math");
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * round(120.4321)
 * //=120
 *
 * round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (num === undefined || num === null || isNaN(num))
        throw new Error('num is required');
    if (precision && !(precision >= 0))
        throw new Error('precision must be a positive number');
    return math_1["default"].round(num, precision);
}
exports.round = round;
//# sourceMappingURL=round.js.map