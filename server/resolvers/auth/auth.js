const jwt = require('jsonwebtoken');

const logic = {
    checkToken: async(token) =>{
        let ret = 0;
        try{
            ret = jwt.verify(token,process.env.JWT_SECRET)
        } catch { 
            return 401
        }
        return ret
    },
    
    getToken: (name, rate, tier) => {
        return jwt.sign({
            name : name,
            rated :rate,
            class : tier
        },process.env.JWT_SECRET)
    }
}
module.exports = logic