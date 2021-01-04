AFRAME.registerComponent('target', {
  schema: {
    active: { default: true },
    healthPoints: { default: 1, type: 'float' },
    static: { default: true },
  },

  init: function () {
    let el = this.el
    el.addEventListener('object3dset', evt => {
      el.sceneEl.systems.ball.registerTarget(this, this.data.static)
    });
  },

  update: function (oldData) {
  },

  /**
   * Take damage.
   */
  onBallHit: function (ball) {
    if (!this.data.active) { return; }
    this.lastBallHit = ball
  }
})
