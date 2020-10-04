const User = require('./user')

module.exports = {
    register:(parent, args, {db,token}) => User.Member.signUp(parent,args,{db})
}