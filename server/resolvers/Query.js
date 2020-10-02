const Site = require('./user')

module.exports = {
    idCheck:(parent, args,{db}) => Site.Member.idCheck(parent,args,{db}),
    nameCheck:(parent,args,{db}) => Site.Member.nameCheck(parent,args,{db}),
    login:(parent,args,{db}) => Site.Member.login(parent,args,{db}),
    leaderBoard:(parent,args,{db}) => Site.Member.leaderBoard(parent,args,{db})
}