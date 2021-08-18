"use strict";
exports.__esModule = true;
exports.validateId = void 0;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id)
        throw new Error('id is required');
    if (['string', 'number'].indexOf(typeof id) === -1)
        throw new Error('id must be a number or a string');
}
exports.validateId = validateId;
//# sourceMappingURL=validateId.js.map