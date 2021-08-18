
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
export function isNumber(num: number): boolean {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
