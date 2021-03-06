const jwt = require('jsonwebtoken');
const AuthRepository=require('../repository/authRepository')

const authRepository=new AuthRepository()

async function tokenValidationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(403).send({error:'access denied'})
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err || !('email' in user)) return res.status(403).send({error: 'access denied'})
        var isValid = await authRepository.tokenValidity(user.id,user.email,user.password) //checking whether the current password is the same
        if(!isValid) return res.status(403).send({error: 'access denied'})
        req.body['id'] = user.id
        next()
    })
}

module.exports=tokenValidationMiddleware