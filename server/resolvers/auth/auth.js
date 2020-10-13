const jwt = require('jsonwebtoken');

const logic = {
    check: async(token) => {
        let ret = 0;
        try{
            ret = jwt.verify(token,process.env.JWT_SECRET)
        } catch { 
            return 401
        }
        return ret
    },
    
    get: (name, status , channel) => {
        return jwt.sign({
            name : name,
            status : status, // 1,2 매칭 3,4 인겜
            channel : channel
        },process.env.JWT_SECRET)
    }
}
module.exports = logic