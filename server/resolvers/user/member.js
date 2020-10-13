const Auth = require('../auth')
const crypto = require('crypto');

const canchar = "!@#$%^&*()-_=+/?.>,<;:[{]}"
const minLength = 6
const minNameLength = 2

const canId = (x) => 'a'<=x && x<= 'z' || 'A'<=x && x<='Z' || '0' <= x && x<='9'
const canPw = (x) => {
    for(const i of canchar) if(x === i) return true
    return false
}

const logic = {
    async signUp(parent,args, {db}){
        const cnt1 = await db.collection('user').findOne({name:args.name})
        const cnt2 = await db.collection('user').findOne({id:args.id})
        if(cnt1 || cnt2 || args.id.length < minLength || args.pw.length < minLength || args.name < minNameLength) return {code : 409}
        for(const x of args.id) if(!canId(x)) return {code : 409}
        for(const x of args.pw) if(!canPw(x) && !canId(x)) return {code : 409}
        const seed = Math.round((new Date().valueOf() * Math.random())) + ""
        db.collection('user').insertOne({
            name : args.name,
            id : args.id,
            pw : crypto.createHash("sha512").update(args.pw + seed).digest('hex'),
            seed : seed,
            rated : 1000,
            class : 1
        })
        db.collection('status').insertOne({
            name : args.name,
            state : 0, // 0 lobby, 1 normal match, 2 rank match, 3 normal game, 4 rank game
            channel : 0, // normal = 1 ~ 10000  // rank 20000~30000
             
        })
        return{
            token : Auth.Token.get(args.name,0,0),
            code : 200
        }
    },

    async nameCheck(parent, args, {token, db}){
        const cnt = await db.collection('user').findOne({name : args.name})
        if(cnt || args.name.length < minNameLength) return false
        return true
    },

    async idCheck(parent, args, {token, db}){
        const cnt = await db.collection('user').findOne({id : args.id})
        if(cnt || args.id.length < minLength) return false
        return true
    },

    async login(parent, args, {db}){
        const info = await db.collection('user').findOne({id:args.id})
        if(crypto.createHash("sha512").update(args.pw + info.seed).digest("hex") === info.pw){
            return {
                token : Auth.Token.get(info.name,0,0),
                code: 200
            }
        }
        return { code : 401 }
    }
}

module.exports = logic
