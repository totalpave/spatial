import test from 'tape';
import midpoint from '.';
import distance from '@spatial/distance';
import { point } from '@spatial/helpers';

test('midpoint -- horizontal equator', function (t) {
    var pt1 = point([0, 0]);
    var pt2 = point([10, 0]);

    var mid = midpoint(pt1, pt2);

    t.equal(distance(pt1, mid).toFixed(6), distance(pt2, mid).toFixed(6));

    t.end();
});

test('midpoint -- vertical from equator', function (t) {
    var pt1 = point([0, 0]);
    var pt2 = point([0, 10]);

    var mid = midpoint(pt1, pt2);

    t.equal(distance(pt1, mid).toFixed(6), distance(pt2, mid).toFixed(6));

    t.end();
});

test('midpoint -- vertical to equator', function (t) {
    var pt1 = point([0, 10]);
    var pt2 = point([0, 0]);

    var mid = midpoint(pt1, pt2);

    t.equal(distance(pt1, mid).toFixed(6), distance(pt2, mid).toFixed(6));

    t.end();
});

test('midpoint -- diagonal back over equator', function (t) {
    var pt1 = point([-1, 10]);
    var pt2 = point([1, -1]);

    var mid = midpoint(pt1, pt2);

    t.equal(distance(pt1, mid).toFixed(6), distance(pt2, mid).toFixed(6));

    t.end();
});

test('midpoint -- diagonal forward over equator', function (t) {
    var pt1 = point([-5, -1]);
    var pt2 = point([5, 10]);

    var mid = midpoint(pt1, pt2);

    t.equal(distance(pt1, mid).toFixed(6), distance(pt2, mid).toFixed(6));

    t.end();
});

test('midpoint -- long distance', function (t) {
    var pt1 = point([22.5, 21.94304553343818]);
    var pt2 = point([92.10937499999999, 46.800059446787316]);

    var mid = midpoint(pt1, pt2);

    t.equal(distance(pt1, mid).toFixed(6), distance(pt2, mid).toFixed(6));

    t.end();
});
