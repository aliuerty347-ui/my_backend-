const jwt=require("jsonwebtoken")
const authMiddleewer=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith('Bearer')){
        return res.status(401).json({message:"غير مصرح لك بدخول يرجى تسجيل دخول"})
    }
    const token =authHeader.split(' ',[1])
    try{
        const docoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=docoded
        return next()
    }catch(error){
        return res.json({message:"غير صالح او منتهي صلاحية "})

    }
   
}
module.exports=authMiddleewer