const { endGame } = require('./game')

module.exports = {
    endGame: (parent,args,{ db }) => endGame(parent,args,{ db })
}