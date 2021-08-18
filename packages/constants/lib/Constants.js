"use strict";
exports.__esModule = true;
exports.AREA_FACTORS = exports.UNIT_FACTORS = exports.FACTORS = exports.EARTH_RADIUS = void 0;
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 */
exports.EARTH_RADIUS = 6371008.8;
;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
exports.FACTORS = {
    meters: exports.EARTH_RADIUS,
    metres: exports.EARTH_RADIUS,
    millimeters: exports.EARTH_RADIUS * 1000,
    millimetres: exports.EARTH_RADIUS * 1000,
    centimeters: exports.EARTH_RADIUS * 100,
    centimetres: exports.EARTH_RADIUS * 100,
    kilometers: exports.EARTH_RADIUS / 1000,
    kilometres: exports.EARTH_RADIUS / 1000,
    miles: exports.EARTH_RADIUS / 1609.344,
    nauticalmiles: exports.EARTH_RADIUS / 1852,
    inches: exports.EARTH_RADIUS * 39.370,
    yards: exports.EARTH_RADIUS / 1.0936,
    feet: exports.EARTH_RADIUS * 3.28084,
    radians: 1,
    degrees: exports.EARTH_RADIUS / 111325
};
/**
 * Units of measurement factors based on 1 meter.
 */
exports.UNIT_FACTORS = {
    meters: 1,
    metres: 1,
    millimeters: 1000,
    millimetres: 1000,
    centimeters: 100,
    centimetres: 100,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    miles: 1 / 1609.344,
    nauticalmiles: 1 / 1852,
    inches: 39.370,
    yards: 1 / 1.0936,
    feet: 3.28084,
    radians: 1 / exports.EARTH_RADIUS,
    degrees: 1 / 111325
};
/**
 * Area of measurement factors based on 1 square meter.
 */
exports.AREA_FACTORS = {
    meters: 1,
    metres: 1,
    millimeters: 1000000,
    millimetres: 1000000,
    centimeters: 10000,
    centimetres: 10000,
    kilometers: 0.000001,
    kilometres: 0.000001,
    acres: 0.000247105,
    miles: 3.86e-7,
    yards: 1.195990046,
    feet: 10.763910417,
    inches: 1550.003100006
};
//# sourceMappingURL=Constants.js.map