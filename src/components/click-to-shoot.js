AFRAME.registerComponent('click-to-shoot', {
    init: function () {
        document.body.addEventListener('mousedown', this.shoot.bind(this) )
    },

    shoot: function () {
        if (this.el.sceneEl.systems.state.state.isPlaying) this.el.emit('shoot')
    }
})

