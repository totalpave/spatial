
import Math from '@totalpave/math';

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
export function round(num: number, precision: number = 0): number {
    if (num === undefined || num === null || isNaN(num)) throw new Error('num is required');
    if (precision && !(precision >= 0)) throw new Error('precision must be a positive number');
    return Math.round(num, precision);
}
