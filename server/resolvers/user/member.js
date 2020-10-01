const Auth = require('../auth')
const crypto = require('crypto');
const { login } = require('../Query');

const canchar = "!@#$%^&*()-_=+/?.>,<;:[{]}"

const canId = (x) => 'a'<=x && x<= 'z' || 'A'<=x && x<='Z' || '0' <= x && x<='9'
const canPw = (x) => {
    for(const i of canchar) if(x == i) return true
    return false
}

const logic = {
    async signUp(parent,args, {db}){
        const cnt1 = await db.collection('user').findOne({name:args.name})
        const cnt2 = await db.collection('user').findOne({id:args.id})
        if(cnt1 || cnt2 || args.id.length < 6 || args.pw.length < 6 || args.name < 1) return {code : 409}
        for(const x of args.id) if(!canId(x)) return {code : 409}
        for(const x of args.pw) if(!canPw(x) && !canId(x)) return {code : 409}
        const seed = Math.round((new Date().valueOf() * Math.random())) + ""
        db.collection('user').insertOne({
            name : args.name,
            id : args.id,
            pw : crypto.createHash("sha512").update(args.pw + seed).digest('hex'),
            seed : seed,
            rated : 1000,
            inGame : 0,
        })
        return{
            token : Auth.Token.getToken(args.name),
            code : 200
        }
    },

    async nameCheck(parent, args, {token, db}){
        const cnt = await db.collection('user').findOne({name : args.name})
        if(cnt) return false
        return true
    },

    async idCheck(parent, args, {token, db}){
        const cnt = await db.collection('user').findOne({id : args.id})
        if(cnt) return false
        return true
    },

    async login(parent, args, {token, db}){
        const info = await db.collection('user').findOne({id:args.id})
        if(crypto.createHash("sha512").update(args.pw + info.seed).digest("hex") == info.pw){
            db.collection('user').updateOne({id : args.id},{$set:{'inGame':0}})
            return {
                token : Auth.Token.getToken(info.name),
                code: 200
            }
        }
        return { code : 401}
    }
}

module.exports = logic