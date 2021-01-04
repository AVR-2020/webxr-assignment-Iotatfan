AFRAME.registerComponent('ball', {
    schema: {
        direction: {type: 'vec3'},
        lifeTime: {default: 5.0, type: 'float'},
        name: {default: 'normal', type: 'string'},
        poolSize: {default: 8.0, type: 'float'},
        position: {type: 'vec3'},
        speed: {default: 10.0, type: 'float'}
    },

    init: function () {
        var el = this.el
        el.object3D.visible = false
        el.addEventListener('object3dset', evt => {
          el.sceneEl.systems.ball.registerBall(this)
        })

    },

    update: function (oldData) {
    },

    remove: function () {
    },

    tick: function (time, timeDelta) {
    },

    play: function () {
    },

})

AFRAME.registerSystem('ball', {
  init: function () {
    var ballContainer
    ballContainer = document.createElement('a-entity')
    ballContainer.id = 'ballContainer'
    this.el.sceneEl.appendChild(ballContainer)

    this.container = ballContainer.object3D
    this.pool = {}
    this.targets = []
  },

  registerBall: function(ballComponent) {
    var ball
    var ballData
    var i
    var model

    model = ballComponent.el.object3D
    if (!model) return
    ballData = ballComponent.data

    // Init pool and BALLS
    this.pool[ballData.name] = []
    for (i = 0; i < ballData.poolSize; i++) {
      ball = model.clone()
      ball.direction = new THREE.Vector3(0, 1, -1)
      ball.lifeTime = ballData.lifeTime * 1000
      ball.name = ballData.name + i
      ball.speed = ballData.speed
      ball.time = 0
      ball.visible = false
      this.pool[ballData.name].push(ball)
    }
  },

  registerTarget: function (targetComponent, isStatic) {
    var targetObj;
    this.targets.push(targetComponent.el);
    if (!isStatic) { return; }
    
    // Precalculate bounding box of bullet.
    targetObj = targetComponent.el.object3D;
    targetObj.boundingBox = new THREE.Box3().setFromObject(targetObj);
  },

  shoot: function (ballName, gun) {
    var i 
    var oldest = 0
    var oldestTime = 0
    var pool = this.pool[ballName]

    if (pool === undefined) return
    
    // Find available ball and initialize it.
    for (i = 0; i < pool.length; i++) {
      if (pool[i].visible === false) {
        return this.shootBall(pool[i], gun)
      } else if (pool[i].time > oldestTime){
        oldest = i
        oldestTime = pool[i].time
      }
    }

    return this.shootBall(pool[oldest], gun)
  },

  shootBall: function (ball, gun) {
    ball.visible = true
    ball.time = 0
    gun.getWorldPosition(ball.position)
    gun.getWorldDirection(ball.direction)
    ball.direction.multiplyScalar(-ball.speed)
    this.container.add(ball)
    return ball
  },

  tick: (function () {
    var ballBox = new THREE.Box3()
    var ballTranslation = new THREE.Vector3()
    var targetBox = new THREE.Box3()

    return function (time, deltaTime) {
      var ball
      var i
      var isHit
      var targetObj
      var t
      
      for (i = 0; i < this.container.children.length; i++) {
        ball = this.container.children[i]
        if (!ball.visible) continue
        ball.time += deltaTime
        if (ball.time >= ball.lifeTime) {
          this.el.emit('miss')
          this.destroyBall(ball)
          continue
        }
        ballTranslation.copy(ball.direction).multiplyScalar(deltaTime / 850)
        ball.position.add(ballTranslation)

        // Collision Check
        ballBox.setFromObject(ball)
        for (t = 0; t < this.targets.length; t++) {
          let target = this.targets[t]
          if (!target.getAttribute('target').active) { continue; }
          targetObj = target.object3D
          isHit = false;
          if (targetObj.boundingBox) {
            isHit = targetObj.boundingBox.intersectsBox(ballBox);
          } else {
            targetBox.setFromObject(targetObj);
            isHit = targetBox.intersectsBox(ballBox)
          }
          if (isHit) {
            this.destroyBall(ball)
            target.components.target.onBallHit(ball)
            target.emit('hit', null)
            break;
          }
        }
      }
    }
  })(),

  destroyBall: function (ball) {
    ball.visible = false
  }
})
