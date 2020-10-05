const User = require('./user')
const Game = require('./game')

module.exports = {
    register:(parent, args, {db}) => User.Member.signUp(parent,args,{db}),
    chat:(parent, args, {db, token, pubsub }) => Game.Other.chat(parent, args, {token, pubsub}),
}