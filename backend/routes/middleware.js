const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../config");

const authMiddleware = (req, res, next) => {

    const inputAuth = req.headers.authorization;
    if (!inputAuth || !inputAuth.startsWith('Bearer ')){
        return res.json({message : "invalid credentials"});
    } 
    const token = inputAuth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            req.body.userId = decoded.userId;
            next();
        }
        else {
            return res.json({message : "invalid credentials"});
        }
    } catch (error) {
        return res.json({message : "invalid credentials"});
    }
}

module.exports = { authMiddleware }