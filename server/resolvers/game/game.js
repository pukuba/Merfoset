const { get } = require('http')
const { monthMap } = require('../../lib')

const endGame = (parent, args, {db})=> {
    const date = new Date()
    const time = date.toString()
    const now = time.substr(11,4) + "-" + monthMap.get(time.substr(4,3)) + "-" + time.substr(8,2)
    try{
        db.collection('scoreBoard').insertOne({
            name : args.name,
            score : args.score,
            date : now
        })
    } catch { 
        return {code : 400}
    }
    return {code : 200}
}

module.exports = { endGame }