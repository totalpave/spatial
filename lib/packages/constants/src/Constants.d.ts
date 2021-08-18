/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 */
export declare const EARTH_RADIUS: number;
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
}
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
export declare const FACTORS: IUnitMapping;
/**
 * Units of measurement factors based on 1 meter.
 */
export declare const UNIT_FACTORS: IUnitMapping;
/**
 * Area of measurement factors based on 1 square meter.
 */
export declare const AREA_FACTORS: IUnitMapping;
