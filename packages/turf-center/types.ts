import {lineString} from '@spatial/helpers'
import center from './'

const line = lineString([[0, 0], [10, 10]]);

center(line)
center(line, {properties: {foo: 'bar'}})
