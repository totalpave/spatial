import { LineString, Feature, Coord, Properties } from '@spatial/helpers'

/**
 * http://turfjs.org/docs/#greatcircle
 */
export default function greatCircle(
    start: Coord,
    end: Coord,
    options?: {
        properties?: Properties,
        npoints?: number,
        offset?: number
    }
): Feature<LineString>;