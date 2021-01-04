const MAX_LIFE = 5
const HIT_VALUE = 300
const STREAK_MULTIPLIER = 0.7

AFRAME.registerState({
    initialState: {
        isGameOver: false,          // Game Over
        isPlaying: false,           // Playing
        leaderboard: {
            names: '',
            scores: '',
            length: 0
        },
        leaderboardActive: false,   // Leaderboard is displayed
        life: MAX_LIFE,             // Player's Life, decrement when miss
        menuActive: true,           // Is in Menu
        score:  {
            catch: 0,               // Total ball catch by player
            highestStreak: 0,       // Highest catch without miss
            score: 0,               // Player's score
            streak: 0               // Player's catch without miss
        },
        shooter:  {
            direction: '0 1 0',
            speed: 2
        }
    },
    handlers: {
        backtomenu: state => {
            state.menuActive = true
            state.isGameOver = false
            state.isPlaying = false
        },

        startgame: state => {
            state.isGameOver = false
            state.isPlaying = true
            state.menuActive = false
            state.leaderboardActive = false
            state.life = MAX_LIFE
            resetScore(state)
        },

        showleaderboard: state => {
            state.menuActive = true
            state.leaderboardActive = true
        },

        leaderboard: (state, payload) => {
            console.log(payload.scores)
            state.leaderboard.length = 0
            state.leaderboard.names = ''
            state.leaderboard.scores = ''

            for (let i = 0; i < payload.scores.length; i++) {
              let score = payload.scores[i]
              console.log(score)
              state.leaderboard.names += `#${i + 1} ${score.username}\n`;
              state.leaderboard.scores += `${score.score}\n`;
            }
        },

        leaderboardusername() {

        },

        miss: state => {
            if (state.score.streak > state.score.highestStreak) {
                state.score.highestStreak = state.score.streak
            }
            state.score.streak = 0
            state.life -= 1
            checkGameOver(state)
        },

        hit: state => {
            state.score.score += Math.floor(HIT_VALUE + (HIT_VALUE * STREAK_MULTIPLIER * state.score.streak / 25))
            state.score.streak += 1
            state.score.catch += 1
        },

        leaderboardsubmit: state => {
            console.log("Submitting Score")
        },
    },

    computeState: state => {
        state.isPlaying =
            !state.isGameOver && !state.menuActive && !state.leaderboardActive
    },
})

function checkGameOver (state) {
    if (state.life <= 0) {
        state.isGameOver = true
        state.isPlaying = false
    }
}

function resetScore (state) {
    state.score.catch = 0
    state.score.highestStreak = 0
    state.score.score = 0
    state.score.streak = 0
}