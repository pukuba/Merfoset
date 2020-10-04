const logic = {
    async leaderBoard(parent, args, {db}){
        return await db.collection('user').find().sort({'rated': -1}).limit(20).toArray()
    },
    
    async Name(parent, args, {db}){
        let result = await db.collection('user').findOne({'name' : args.name})
        if(result) result.code = 200
        else return {code : 412}
        return result
    }
}

module.exports = logic