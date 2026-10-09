const express =require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const authMiddleewer=require("./m")
const dotenv=require("dotenv")
dotenv.config();
const router =express.Router();
const cors=require("cors")
const { model } = require("mongoose");
const Infous=require("../modle/user")
const inforPost=require("../modle/post")
const inforProudect=require("../modle/proudect")

router.use(cors())
const upload=multer({dest:'uploads/'})

router.get("/infous/k",async(req,res)=>{
const newInfous=new Infous()
const r=req.body.u;
const pa=req.body.pa;
newInfous.userN=r ;
newInfous.passW=pa;
await newInfous.save()

res.json("ali");
})















router.get("/profile",authMiddleewer,async(req,res)=>{
try{
  const user =await Infous.findById(req.user.id)
  if(!user){
    return res.json({mesage:"لا يوجد حساب "})
  }
  res.json({user:user,message:"تم ارسال معلومات مستخدم "})
}catch(error){
  res.json({message:"خطإ في سيرفير"})
}


})











router.get("/op",(req,res)=>{
    res.json("kkkkkkkkkkkl;l")
})










router.post("/alip",async(req,res)=>{
   try{
    const g=new Infous()

    const vv= await bcrypt.hash(req.body.passWord,6)
   g.userN=req.body.userName;
    g.passW=vv;
    await g.save()
    res.json("sign successful");
}

    catch(error){
        console.log(error)
        res.json("");
        }
})
router.get("/alip",async(req,res)=>{
    const k=await Infous.find()
    res.status(200).json(k)
})





router.post("/alippp",async(req,res)=>{
  try{
    const seruser=await Infous.findOne({ userN: req.body.user11})
    if(!seruser){
      return res.json({message:"Incorrect username"})
    }
    const co=await bcrypt.compare(req.body.pass11 , seruser.passW)
      if (!co){return res.json({message:"Incorrect password"})}
                 
        
          const se=process.env.JWT_SECRET || "my_backup_secret_key";
          const token =jwt.sign(
            {
              id:seruser._id,
              role:seruser.role
            },
            se,
            {expiresIn:'1h'}
          )
    res.json({
      mesage:"Login successful",
      token:token,
      user:{
        id:seruser._id,
        name:seruser.userN
      }
    })
    console.log(co,"ll")
  }
    catch(error){
      console.log(error)
        res.json("error in server")
      
    }
 

})

// router.post("/inP",async(req,res)=>{
//     const inp=new inforPost()
//     inp.image=req.body.image
//     inp.title=req.body.title
   
//     await inp.save()
//      console.log( req.body.title)
//      console.log( "oooaoaa")
//     res.status(200)
// })
// router.get("/inP",async(req,res)=>{
   
//     const a=await inforPost.find();

//     res.status(200).json(a)
// })
router.post("/inP",upload.single('image'), async(req,res)=>{
    try{
    const inp=new inforPost()
    inp.title=req.body.title
   inp.image=req.file ? req.file.filename:"";
   inp.auther=req.body.auther
   inp.likes=req.body.likes
   inp.commentText=""
   inp.userSub=""
    await inp.save()
    
    res.status(200).json("s")}
    catch(error){
        res.json( {error: error.message })
        console.log(error)
    }
})
router.get("/inP",async(req,res)=>{
  

    const a=await inforPost.find();

    res.json(a)
})
router.delete("/inP/a", async (req, res) => {
    try {
        // افترضنا أن اسم الموديل الخاص بك هو Article أو Post
        await inforPost.deleteMany({}); 
        res.status(200).json({ message: "تم حذف جميع العناصر بنجاح" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




























router.put("/inforProdectAddLike",async(req,res)=>{
  try{
  const u=await inforProudect.findByIdAndUpdate(
    req.body.id,
    {$inc:{likeCounter:1}},
      { new: true }
  )
  res.json({message:"تمت اضافة لايك ", likes: u.likes})
}catch(error){
  console.log(error)
  res.json({message:error.message})

}
})


// controller/post.js (أو في ملف التحلكم الخاص بك)
router.put("/like", async (req, res) => {
  try {
    const { id } = req.body; // أخذ الـ id من الـ body
    const updatedPost = await inforPost.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.status(200).json({ message: "تمت إضافة الإعجاب", likes: updatedPost.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}); 



router.post("/inforProdectAddComment",async(req,res)=>{
  if(!req.body.userSub||!req.body.commentText){
    return res.json("لم يتم ارسال معلومات تعليق")
  }
  try{
  const f=await inforProudect.findByIdAndUpdate(
    req.body.id,
  {  $push:{
      comments:
      { commentUser:req.body.userSub,
        commentText:req.body.commentText
  }}},
   { returnDocument: 'after' } // يعيد المنشور بعد التحديث مشتملاً على التعليق الجديد
   
  )
  if (!f) {
      return res.status(404).json({ message: "المنشور غير موجود" });
    }

  res.json({
      message: "تمت إضافة التعليق بنجاح"
   
    })
}
catch(error){
  res.json({error:error.message})

}
 
  
})












router.post("/addComment", async (req, res) => {
  try {
    const { id } = req.body; // معرف المنشور (Post ID)
    const { commentText, userSub } = req.body;

    // التحقق من وصول البيانات
    if (!commentText || !userSub) {
      return res.status(400).json({ message: "يرجى إرسال نص التعليق ومُعرّف المستخدم" });
    }

    // $push تضيف عنصراً جديداً إلى المصفوفة تلقائياً
    const updatedPost = await inforPost.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            commentText: commentText,
            userSub: userSub
          }
        }
      },
      { returnDocument: 'after' } // يعيد المنشور بعد التحديث مشتملاً على التعليق الجديد
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "المنشور غير موجود" });
    }

    res.status(200).json({
      message: "تمت إضافة التعليق بنجاح",
      post: updatedPost
    });

  } catch (error) {
    console.error("خطأ في إضافة التعليق:", error);
    res.status(500).json({ error: error.message });
  }
});
  router.get("/addComment",async(req,res)=>{
    const ou=await inforPost.find();
    res.json(ou)
})




router.post("/inforProdect",async(req,res)=>{
try{
  // الآن ستكون req.body مليئة بالبيانات المستقبلة من FormData
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "لم يتم إرسال بيانات في req.body" });
    }
  const{title,slug,price,description,image1,image2,image3,name,creationAt}=req.body
  const inforPro=new inforProudect()
inforPro.title=title
inforPro.slug=slug
inforPro.price=price
inforPro.description=description
inforPro.images[0]=image1
inforPro.images[1]=image2
inforPro.images[2]=image3
inforPro.creationAt=creationAt
inforPro.name=name
await inforPro.save()
res.json("تمت اضافة منتج ")
}catch(error){
    console.error("خطأ في إضافة منتج:", error);
    res.status(500).json({ error: error.message });
  
}
})

















router.get("/inforProdecty",async (req,res)=>{
  const i=await inforProudect.find()
  res.json(i)
})

router.delete("/inP/pa", async (req, res) => {
    try {
        // افترضنا أن اسم الموديل الخاص بك هو Article أو Post
        await inforProudect.deleteMany({}); 
        res.status(200).json({ message: "تم حذف جميع العناصر بنجاح" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports=router