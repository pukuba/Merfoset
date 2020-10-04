const User = require('./user')

module.exports = {
    idCheck:(parent, args,{db}) => User.Member.idCheck(parent,args,{db}),
    nameCheck:(parent,args,{db}) => User.Member.nameCheck(parent,args,{db}),
    login:(parent,args,{db}) => User.Member.login(parent,args,{db}),
    leaderBoard:(parent,args,{db}) => User.Search.leaderBoard(parent,args,{db}),
    searchName:(parent,args,{db}) => User.Search.Name(parent,args,{db})
}