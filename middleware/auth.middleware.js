const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    const token=req.headers.authorization

    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userID=decoded.userID
                next()
            }else{
                res.send({"msg":"Something Wrong"})
            }
        })
    }else{
        res.send({"msg":"Please Login First"})
    }
}


module.exports={authentication}