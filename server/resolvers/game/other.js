const auth = require('../auth')

const logic = {
    chat: async(parent,args,{token,pubsub}) =>{
        const userState = await auth.Token.check(token)
        if(userState === 401) {code : 401}
        const newChat = {
            name : userState.name,
            message : args.message,
            code : 200
        }
        pubsub.publish('chat-added' + userState.channel, { newChat })
        return newChat
    },

    newChat: async(parent, args, { subToken,pubsub }) => {
        const userState = await auth.Token.check(subToken)
        if(userState === 401) throw new Error('Token not valid')
        return pubsub.asyncIterator('chat-added' + userState.channel)
    },
}

module.exports = logic