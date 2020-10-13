const auth = require('../auth')
const { rand } = require('../../lib')

const logic = {
    normalQueue: async(parent, args, {db,token}) => {
        const userState = await auth.Token.check(token)
        if(userState === 401) return {code : 401}
        if(userState.status !== 0) return {code : 423}
        const check = await db.collection('status').findOne({'status' : 1})
        if(check === null){
            db.collection('status').updateOne({'name':userState.name},{$set:{status:1,channel:rand(1,9999)}})
            
        }
        else{

        }
        return "asdfdsa"
    },

    normalSub: async(parent, args, {db,subToken}) => {

    },

    normalCancel: async(parent, args, {db,token}) => {
        const userState = await auth.Token.check(token)
        if(userState === 401) return {code : 401}
        if(userState.status !== 1) return {code : 423}
        db.collection('status').updateOne({name:userState.name},{$set:{state : 0}})
        const retToken = auth.Token.get(userState.name, 0, 0)
        return {
            code : 200,
            token : retToken
        }
    },
    
    rankQueue: async(parent, args, {db,token}) => {

    },

    rankSub: async(parent, args, {db,subToken }) => {

    },

    rankCancel: async(parent, args, {db,token}) => {
        const userState = await auth.Token.check(token)
        if(userState === 401) return {code : 401}
        if(userState.status !== 2) return {code : 423}
        db.collection('status').updateOne({name:userState.name},{$set:{state : 0}})
        const retToken = auth.Token.get(userState.name, 0, 0)
        return {
            code : 200,
            token : retToken
        }
    }
}

module.exports = logic