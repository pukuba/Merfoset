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
        engine: {
            reportSchema: true,
            variant: process.env.APOLLO_KEY
        },
        context: async({ req }) => {
            const token = req ? req.headers.authorization : ''
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
            return {db, token, ip, pubsub}
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

    const httpServer = createServer(app)

    server.installSubscriptionHandlers(httpServer)

    httpServer.timeout = 3000

    httpServer.listen({port : process.env.PORT}, () => {
        console.log(`Graphql Server running at http://localhost:${process.env.PORT}/graphql`)
        console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}`)
    })
}

start()