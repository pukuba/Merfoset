const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: async(token) =>{
        let ret = 0;
        try{
            ret = jwt.verify(token,process.env.JWT_SECRET)
        } catch { 
            return 401
        }
        return ret
    },
    
    getToken: (id) => {
        return jwt.sign({
            id: id,
            exp:Math.floor(Date.now() / 1000) + (60 * 60),
        },process.env.JWT_SECRET)
    }
}