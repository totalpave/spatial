"use strict";
exports.__esModule = true;
exports.validateBBox = void 0;
var isNumber_1 = require("./isNumber");
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox)
        throw new Error('bbox is required');
    if (!Array.isArray(bbox))
        throw new Error('bbox must be an Array');
    if (bbox.length !== 4 && bbox.length !== 6)
        throw new Error('bbox must be an Array of 4 or 6 numbers');
    bbox.forEach(function (num) {
        if (!isNumber_1.isNumber(num))
            throw new Error('bbox must only contain numbers');
    });
}
exports.validateBBox = validateBBox;
//# sourceMappingURL=validateBBox.js.map