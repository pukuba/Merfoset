const Game = require('./game')

module.exports = {
    newChat : {
        subscribe: (parent, args, {pubsub , subToken }) => {
            return Game.Other.newChat(parent,args,{subToken ,pubsub})
        }
    } 
}