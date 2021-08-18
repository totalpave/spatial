
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 */
export const EARTH_RADIUS: number = 6371008.8;

export interface IUnitMapping {
    meters: number;
    metres: number;
    millimeters: number;
    millimetres: number;
    centimeters: number;
    centimetres: number;
    kilometers: number;
    kilometres: number;
    miles: number;
    nauticalmiles?: number;
    inches: number;
    yards: number;
    feet: number;
    radians?: number;
    degrees?: number;
    acres?: number;
};

/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
export const FACTORS: IUnitMapping = {
    meters: EARTH_RADIUS,
    metres: EARTH_RADIUS,
    millimeters: EARTH_RADIUS * 1000,
    millimetres: EARTH_RADIUS * 1000,
    centimeters: EARTH_RADIUS * 100,
    centimetres: EARTH_RADIUS * 100,
    kilometers: EARTH_RADIUS / 1000,
    kilometres: EARTH_RADIUS / 1000,
    miles: EARTH_RADIUS / 1609.344,
    nauticalmiles: EARTH_RADIUS / 1852,
    inches: EARTH_RADIUS * 39.370,
    yards: EARTH_RADIUS / 1.0936,
    feet: EARTH_RADIUS * 3.28084,
    radians: 1,
    degrees: EARTH_RADIUS / 111325
};

/**
 * Units of measurement factors based on 1 meter.
 */
export const UNIT_FACTORS: IUnitMapping = {
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
    radians: 1 / EARTH_RADIUS,
    degrees: 1 / 111325,
};

/**
 * Area of measurement factors based on 1 square meter.
 */
export const AREA_FACTORS: IUnitMapping = {
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
