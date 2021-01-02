AFRAME.registerComponent('shooter', {
    schema: {
      activeBall: {type: 'string', default: 'normal'},
      ballTypes: {type: 'array', default: ['normal']},
      cycle: {default: false},
      isPlaying: { default: false },
      shootingDelay: { default: 1000 },  //ms
      lastShootTime: { default: 0 }
    },

    init: function () {
      this.el.addEventListener('shoot', this.onShoot.bind(this))
      this.ballSystem = this.el.sceneEl.systems.ball
    },

    onShoot: function () {
      this.ballSystem.shoot(this.data.activeBall, this.el.object3D)
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
      var data = this.data
      var el = this.el
      this.isPlaying = el.sceneEl.systems.state.state.isPlaying
      

      if ( (time - data.lastShootTime) >= data.shootingDelay && 
            this.isPlaying) {
        data.lastShootTime = time
        // this.shoot()
        el.emit("shoot")
      }

    },

    play: function () {
    },
})
