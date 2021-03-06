import earcut from 'earcut';
import { polygon } from '@spatial/helpers';

/**
 * Tesselates a {@link Feature<Polygon>} into a {@link FeatureCollection<Polygon>} of triangles
 * using [earcut](https://github.com/mapbox/earcut).
 *
 * @name tesselate
 * @param {Feature<Polygon>} poly the polygon to tesselate
 * @returns {FeatureCollection<Polygon>} a geometrycollection feature
 * @example
 * var poly = turf.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
 * var triangles = turf.tesselate(poly);
 *
 * //addToMap
 * var addToMap = [poly, triangles]
 */
function tesselate(poly) {
    if (!poly.geometry || (poly.geometry.type !== 'Polygon' && poly.geometry.type !== 'MultiPolygon')) {
        throw new Error('input must be a Polygon or MultiPolygon');
    }

    const fc = {type: 'FeatureCollection', features: []};

    if (poly.geometry.type === 'Polygon') {
        fc.features = processPolygon(poly.geometry.coordinates);
    } else {
        poly.geometry.coordinates.forEach(function (coordinates) {
            fc.features = fc.features.concat(processPolygon(coordinates));
        });
    }

    return fc;
}

function processPolygon(coordinates) {
    const data = flattenCoords(coordinates);
    const dim = 2;
    const result = earcut(data.vertices, data.holes, dim);

    const features = [];
    const vertices = [];

    result.forEach(function (vert, i) {
        const index = result[i];
        vertices.push([data.vertices[index * dim], data.vertices[index * dim + 1]]);
    });

    for (let i = 0; i < vertices.length; i += 3) {
        const coords = vertices.slice(i, i + 3);
        coords.push(vertices[i]);
        features.push(polygon([coords]));
    }

    return features;
}

function flattenCoords(data) {
    const dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim};
    let holeIndex = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            for (let d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }

    return result;
}

export default tesselate;
