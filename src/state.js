AFRAME.registerState({
    initialState: {
        isGameOvewr: false,         // Game Over
        isPlaying: false,           // Playing
        leaderboardActive: false,   // Leaderboard is displayed
        lifeAmount: 3,              // Player's Life, decrement when miss
        menuActive: true,           // Is in Menu
        score:  {
            catch: 0,               // Total ball catch by player
            highestStreak: 0,       // Highest catch without miss
            score: 0,               // Player's score
            streak: 0               // Player's catch without miss
        }
    },
    handlers: {
        startgame: state => {
            state.leaderboardActive = false
            state.menuActive = false
        },
        showleaderboard: state => {
            state.menuActive = true
            state.leaderboardActive = true
        }
    }
})