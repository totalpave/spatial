import rbush from 'geojson-rbush';
import clone from '@spatial/clone';
import overlap from '@spatial/boolean-overlap';
import turfUnion from '@spatial/union';
import lineIntersect from '@spatial/line-intersect';
import { coordAll } from '@spatial/meta';
import { collectionOf } from '@spatial/invariant';
import { lineString, isObject } from '@spatial/helpers';
import { closestGreaterNumber } from './lib/get-closest';

/**
 * Dissolves a FeatureCollection of {@link polygon} features, filtered by an optional property name:value.
 * Note that {@link mulitpolygon} features within the collection are not supported
 *
 * @name dissolve
 * @param {FeatureCollection<Polygon>} featureCollection input feature collection to be dissolved
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.propertyName] features with equals 'propertyName' in `properties` will be merged
 * @returns {FeatureCollection<Polygon>} a FeatureCollection containing the dissolved polygons
 * @example
 * var features = turf.featureCollection([
 *   turf.polygon([[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]], {combine: 'yes'}),
 *   turf.polygon([[[0, -1], [0, 0], [1, 0], [1, -1], [0,-1]]], {combine: 'yes'}),
 *   turf.polygon([[[1,-1],[1, 0], [2, 0], [2, -1], [1, -1]]], {combine: 'no'}),
 * ]);
 *
 * var dissolved = turf.dissolve(features, {propertyName: 'combine'});
 *
 * //addToMap
 * var addToMap = [features, dissolved]
 */
function dissolve(featureCollection, options) {
    // Optional parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    const propertyName = options.propertyName;

    // Input validation
    collectionOf(featureCollection, 'Polygon', 'dissolve');

    // Main
    const fc = clone(featureCollection);
    const features = fc.features;

    const originalIndexOfItemsRemoved = [];

    features.forEach(function (f, i) {
        f.properties.origIndexPosition = i;
    });
    const tree = rbush();
    tree.load(fc);

    for (var i in features) {
        var polygon = features[i];

        var featureChanged = false;

        tree.search(polygon).features.forEach(function (potentialMatchingFeature) {
            polygon = features[i];

            let matchFeaturePosition = potentialMatchingFeature.properties.origIndexPosition;

            if (originalIndexOfItemsRemoved.length > 0 && matchFeaturePosition !== 0) {
                if (matchFeaturePosition > originalIndexOfItemsRemoved[originalIndexOfItemsRemoved.length - 1]) {
                    matchFeaturePosition = matchFeaturePosition - (originalIndexOfItemsRemoved.length);
                } else {
                    const closestNumber = closestGreaterNumber(matchFeaturePosition, originalIndexOfItemsRemoved);
                    if (closestNumber !== 0) {
                        matchFeaturePosition = matchFeaturePosition - closestNumber;
                    }
                }
            }

            if (matchFeaturePosition === +i) return;

            const matchFeature = features[matchFeaturePosition];
            if (!matchFeature || !polygon) return;

            if (propertyName !== undefined &&
                matchFeature.properties[propertyName] !== polygon.properties[propertyName]) return;

            if (!overlap(polygon, matchFeature) || !ringsIntersect(polygon, matchFeature)) return;

            features[i] = turfUnion(polygon, matchFeature);

            originalIndexOfItemsRemoved.push(potentialMatchingFeature.properties.origIndexPosition);
            originalIndexOfItemsRemoved.sort(function (a, b) { return a - b; });

            tree.remove(potentialMatchingFeature);
            features.splice(matchFeaturePosition, 1);
            polygon.properties.origIndexPosition = i;
            tree.remove(polygon, function (a, b) { return a.properties.origIndexPosition === b.properties.origIndexPosition; });
            featureChanged = true;
        });

        if (featureChanged) {
            if (!polygon) continue;
            polygon.properties.origIndexPosition = i;
            tree.insert(polygon);
            i--;
        }
    }

    features.forEach(function (f) {
        delete f.properties.origIndexPosition;
        delete f.bbox;
    });

    return fc;
}

function ringsIntersect(poly1, poly2) {
    const line1 = lineString(coordAll(poly1));
    const line2 = lineString(coordAll(poly2));
    const points = lineIntersect(line1, line2).features;
    return points.length > 0;
}

export default dissolve;
