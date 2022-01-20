const jwt = require('jsonwebtoken');
const AuthRepository=require('../repository/authRepository')

const authRepository=new AuthRepository()

async function adminMiddleWare(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]//get token from headers
    if (token == null) return res.status(403).send({error:'access denied'})
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        console.log('start in verify',user)
        if (err || !('email' in user)) return res.status(403).send({error: 'access denied'})//if user not found of that email access denied
        var isValid = await authRepository.tokenValidity(user.id,user.email,user.password)//if user changes password then access denied
        console.log('isvalid ',isValid)
        if(!isValid) return res.status(403).send({error: 'access denied'})
        if(user.type!==1) return res.status(403).send({error: 'access denied'}) //admins are type 1 users
        req.body['id'] = user.id //this is being plugges in to the request body manually for further usage
        next()
    })
}

module.exports=adminMiddleWare