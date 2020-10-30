const {scoreBoard,searchUser} = require('./user')

module.exports = {
    scoreBoard: async(parent,args,{ db }) => scoreBoard(parent,args,{ db }),
    searchUser: async(parent,args,{ db }) => searchUser(parent,args,{ db })   
}