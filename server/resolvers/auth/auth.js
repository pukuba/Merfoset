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
    
    getToken: (name) => {
        return jwt.sign({
            name : name
        },process.env.JWT_SECRET)
    }
}
module.exports = logic