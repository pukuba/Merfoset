const scoreBoard = async(parent, args ,{ db}) => await db.collection('scoreBoard').find().sort({"score":-1}).limit(10).toArray()

const searchUser = async(parent, args, { db}) => await db.collection('scoreBoard').find({name : args.name}).sort({"score":-1}).limit(10).toArray()

module.exports = {scoreBoard,searchUser}