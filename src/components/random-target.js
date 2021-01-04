var posX = [ -3, -2, -1, 0, 1 , 2, 3 ]
var posY = [ 2 ]

AFRAME.registerComponent('random-target', {
    schema: {
        moveDelay: {default: 500},
        lastMoveTime: {defaul: 0},
        isPlaying: { default: false },
    },

    init: function () {
      // Do something when component first attached.
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      let entity = this.el.object3D
      let data = this.data
      this.isPlaying = this.el.sceneEl.systems.state.state.isPlaying

      if ( (time - data.lastMoveTime) >= data.moveDelay && this.isPlaying) {
          data.lastMoveTime = time
          entity.position.x = posX[Math.floor(Math.random()*posX.length)]
          entity.position.y = posY[Math.floor(Math.random()*posY.length)]
      }

    } 
});
