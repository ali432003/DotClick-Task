import jwt from 'jsonwebtoken'

export const auth = async(req,res,next) =>{
    try {
        const token = req.header.authorization
    
        if(!token || token[1] !== 'Bearer'){
            return res.status(400).json({message: 'Invalid Token'})
        }else{
            const user = jwt.verify(token[0],process.env.SECRET)
            if(!user){
                throw new Error('Invalid User')
            }
            req.user = user

            next()
        }
        
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}