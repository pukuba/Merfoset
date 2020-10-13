const { ApolloServer,PubSub } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default

const { MongoClient } = require('mongodb')

const { readFileSync } = require('fs')
const { createServer } = require('http')
const path = require('path')

require('dotenv').config()

const depthLimit = require('graphql-depth-limit')
const { createComplexityLimitRule } = require('graphql-validation-complexity')

const resolvers = require('./resolvers')
const typeDefs = readFileSync('./typeDefs.graphql','utf-8')

const auth = require('./resolvers/auth')

const normalQueue = 1, rankQueue = 2, normalInGame = 3, rankInGame = 4

const start = async() => {
    const app = express()
    const pubsub = new PubSub()
    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    
    const db = client.db()
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        subscriptions:{
            onConnect: (req, websocket) => {
                if(req){
                    return {token : req.Authorization}
                }
                throw new Error ("Missing token!")
            },
            
            onDisconnect: async(webSocket,context) => {
                const getPromise = await context.initPromise
                const token = await auth.Token.check(getPromise.token)
                console.log(token)
                if(token.status === normalQueue || token.status === rankQueue) db.collection('status').updateOne({name : token.name},{$set:{state:0}})
                else if(token.status === normalInGame) db.collection('status').updateOne({name : token.name},{$set:{state : 0, channel : 0}})
                else if(token.status === rankInGame){
                    const user = await db.collection('user').findOne({name : token.name})
                    updateLated(name.name, user.rated, -100, db)
                }

            }
        },
        engine: {
            reportSchema: true,
            variant: process.env.APOLLO_KEY
        },
        context: async({ req,connection }) => {
            const token = req ? req.headers.authorization : ''
            const ip = req ? req.connection.remoteAddress : ''
            const subToken =  connection ? connection.context.token : ''
            return {db, token, ip ,pubsub, subToken}
        },
        validationRules: [
            depthLimit(7),
            createComplexityLimitRule(10000, {
                onCost: cost => console.log('query cost: ', cost)
            })
        ]
    })

    server.applyMiddleware({ app })

    app.get('/playground',expressPlayground({endpoint:'/graphql'}))

    app.use('/class/',express.static(path.join(__dirname,'image/class')))

    const httpServer = createServer(app)

    server.installSubscriptionHandlers(httpServer)

    httpServer.timeout = 3000

    httpServer.listen({port : process.env.PORT}, () => {
        console.log(`Graphql Server running at http://localhost:${process.env.PORT}/graphql`)
        console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}`)
    })
}

start()