const user = require('./user')

module.exports = {
    register:(parent, args, {db,token}) => user.Member.signUp(parent,args,{db})
}