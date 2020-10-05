const Game = require('./game')

module.exports = {
    newChat:{
        subscribe:(parent, args, {pubsub, token }) => Game.Other.newChat(parent,args,{pubsub,token})
    }
}