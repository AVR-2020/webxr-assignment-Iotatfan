// AFRAME.registerComponent('custom-controls', {
//     schema: {
//       hand: {default: ''},
//       model: {default: ''}
//     },
  
//     update: function () {
//       var hand = this.data.hand;
//       var el = this.el;
//       var controlConfiguration = {
//         hand: hand,
//         model: false,
//         orientationOffset: {x: 0, y: 0, z: hand === 'left' ? 90 : -90}
//       };
  
//       // Build on top of controller components.
//       el.setAttribute('vive-controls', controlConfiguration);
//       el.setAttribute('oculus-touch-controls', controlConfiguration);
//       el.setAttribute('daydream-controls', controlConfiguration);
//       el.setAttribute('gearvr-controls', controlConfiguration);
//       el.setAttribute('windows-motion-controls', controlConfiguration);
  
//       // Set a model.
//       el.setAttribute('gltf-model', this.data.model);
//     }
//   })
