import {lineString} from '@spatial/helpers'
import centerMean from './'

const line = lineString([[0, 0], [10, 10]]);

centerMean(line)
centerMean(line, {properties: {foo: 'bar'}})
centerMean(line, {weight: 'foo'})
