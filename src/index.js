function requireAll (req) { req.keys().forEach(req); }

require('aframe-event-set-component')
require('aframe-look-at-component')
require('aframe-proxy-event-component')
require('aframe-slice9-component')
require('aframe-state-component')

require('./scene.html')

require('./state')

requireAll(require.context('./components/', true, /\.js$/))


if (module.hot) { module.hot.accept(); }

// LOAD MODELS