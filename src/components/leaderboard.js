const NUM_SCORES_DISPLAYED = 10

AFRAME.registerComponent('leaderboard', {
  schema: {
    apiKey: { type: 'string', default: "AIzaSyAHTk_2RY9VNYa5BTz5Kwnb_s8SRsREgW8" },
    authDomain: { type: 'string', default: "webxr-iotatfan.firebaseapp.com" },
    databaseURL: { type: 'string', default: "webxr-iotatfan.firebaseio.com" },
    projectId: { type: 'string', default: "webxr-iotatfan" },
    storageBucket: { type: 'string', default: "webxr-iotatfan.appspot.com" }
  },

  init: function () {
    // Init DB connection
    this.scores = []
    this.eventDetail = {scores: this.scores}
    this.addEventDetail = {scoreData: undefined, index: undefined}

    let el = this.el
    firebase.initializeApp({
      apiKey: this.data.apiKey,
      authDomain: this.data.authDomain,
      databaseURL: this.data.databaseURL,
      projectId: this.data.projectId,
      storageBucket: this.data.storageBucket
    })
    this.firestore = firebase.firestore()
    this.firestore.settings({})
    this.db = this.firestore.collection('scores')

    this.username = localStorage.getItem('leaderboardusername')
    this.el.addEventListener('leaderboardusername', evt => {
      this.username = evt.detail.value
      console.log(this.username)
      localStorage.setItem('username', this.username);
    })
    this.el.addEventListener('leaderboardsubmit', this.addScore.bind(this))
    this.el.addEventListener('showleaderboard', this.fetchScore.bind(this))
  },

  update: function () {
    // Do something when component's data is updated.
  },

  addScore: function () {
    const state = this.el.sceneEl.systems.state.state

    const scoreData = {
      score: state.score.score,
      streak: state.score.highestStreak,
      username: this.username,
      time: new Date()
    }
    console.log(scoreData)

    this.db.add(scoreData)

    this.addEventDetail.scoreData = scoreData
    this.el.emit('backtomenu')
  },

  fetchScore: function () {
    const state = this.el.sceneEl.systems.state
    const query = this.db
                    .orderBy('score', 'desc')
                    .limit(10)

    query.get().then(snapshot => {
      this.scores.length = 0
      if (!snapshot.empty) {
        snapshot.forEach(score => this.scores.push(score.data()))
      }
      this.el.sceneEl.emit('leaderboard', this.eventDetail, false)
    }).catch(e => {
      console.error('[firestore', e)
    })
  }
});
