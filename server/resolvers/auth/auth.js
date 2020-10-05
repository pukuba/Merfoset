const jwt = require('jsonwebtoken');

const logic = {
    check: async(token) => {
        console.log(token)
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
            status : status,
            channel : channel
        },process.env.JWT_SECRET)
    }
}
module.exports = logic