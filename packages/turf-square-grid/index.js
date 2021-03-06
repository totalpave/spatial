import distance from '@spatial/distance';
import intersect from '@spatial/intersect';
import {getType} from '@spatial/invariant';
import {polygon, featureCollection, isObject, isNumber} from '@spatial/helpers';

/**
 * Creates a square grid from a bounding box, {@link Feature} or {@link FeatureCollection}.
 *
 * @name squareGrid
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide of each cell, in units
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] used in calculating cellSide, can be degrees, radians, miles, or kilometers
 * @param {Feature<Polygon|MultiPolygon>} [options.mask] if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @param {Object} [options.properties={}] passed to each point of the grid
 * @returns {FeatureCollection<Polygon>} grid a grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var squareGrid = turf.squareGrid(bbox, cellSide, options);
 *
 * //addToMap
 * var addToMap = [squareGrid]
 */
function squareGrid(bbox, cellSide, options) {
    // Optional parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    // var units = options.units;
    const properties = options.properties;
    const mask = options.mask;

    // Containers
    const results = [];

    // Input Validation
    if (cellSide === null || cellSide === undefined) throw new Error('cellSide is required');
    if (!isNumber(cellSide)) throw new Error('cellSide is invalid');
    if (!bbox) throw new Error('bbox is required');
    if (!Array.isArray(bbox)) throw new Error('bbox must be array');
    if (bbox.length !== 4) throw new Error('bbox must contain 4 numbers');
    if (mask && ['Polygon', 'MultiPolygon'].indexOf(getType(mask)) === -1) throw new Error('options.mask must be a (Multi)Polygon');

    const west = bbox[0];
    const south = bbox[1];
    const east = bbox[2];
    const north = bbox[3];

    const xFraction = cellSide / (distance([west, south], [east, south], options));
    const cellWidth = xFraction * (east - west);
    const yFraction = cellSide / (distance([west, south], [west, north], options));
    const cellHeight = yFraction * (north - south);

    // rows & columns
    const bboxWidth = (east - west);
    const bboxHeight = (north - south);
    const columns = Math.floor(bboxWidth / cellWidth);
    const rows = Math.floor(bboxHeight / cellHeight);

    // adjust origin of the grid
    const deltaX = (bboxWidth - columns * cellWidth) / 2;
    const deltaY = (bboxHeight - rows * cellHeight) / 2;

    // iterate over columns & rows
    let currentX = west + deltaX;
    for (let column = 0; column < columns; column++) {
        let currentY = south + deltaY;
        for (let row = 0; row < rows; row++) {
            const cellPoly = polygon([[
                [currentX, currentY],
                [currentX, currentY + cellHeight],
                [currentX + cellWidth, currentY + cellHeight],
                [currentX + cellWidth, currentY],
                [currentX, currentY]
            ]], properties);
            if (mask) {
                if (intersect(mask, cellPoly)) results.push(cellPoly);
            } else {
                results.push(cellPoly);
            }

            currentY += cellHeight;
        }
        currentX += cellWidth;
    }
    return featureCollection(results);
}

export default squareGrid;
