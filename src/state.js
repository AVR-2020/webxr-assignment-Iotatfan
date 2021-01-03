const MAX_LIFE = 100

AFRAME.registerState({
    initialState: {
        isGameOver: false,          // Game Over
        isPlaying: false,           // Playing
        leaderboard: [],
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
        startgame: state => {
            console.log('Entering Playing State')
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

        miss: state => {
            console.log("Miss")
            state.score.streak = 0
            state.life -= 1
            checkGameOver(state)
        }
    },

    computeState: state => {
        state.isPlaying =
            !state.isGameOver && !state.menuActive && !state.leaderboardActive
    },
})

function checkGameOver (state) {
    if (state.life <= 0) {
        console.log("Game Over")
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