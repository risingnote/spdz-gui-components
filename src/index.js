// Polyfill Object.assign
Object.assign = require('object-assign');

import Connection from './components/Connection'
import setupWrapper from './wrappers/SetupContainer'

export { Connection,
         setupWrapper}
