const express=require("express");
const cors=require("cors")

const inforPost=require("./modle/modle/post")
const app =express();
const mongoose=require("mongoose")
const infousRouter =require("./modle/controral/controral")
app.use(cors())
app.use(express.json());
mongoose.connect("mongodb+srv://aliuerty347:ali2468@cluster00.fp5h7n7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster00")
.then(()=>{
    console.log("connected s")
})
.catch((error)=>{
    console.log("ali:", error.message)
})
app.use("/",infousRouter)
app.use((err,req,res,next)=>{
    const statuscode=err.status||500;
    const message='خطأ في سيرفير'
    res.status(statuscode).json({
        status:'error',
        statuscode,
        message
    })
})
app.get("/",(req,res)=>{
    res.send("hooooooooollo ali")
})

app.get("/sum/:n1/:n2",(req,res)=>{
const nn1=req.params.n1;
const nn2=req.params.n2;
console.log(Number(nn1)+Number(nn2))
res.status(200).json(`this sum=${Number(nn1)+Number(nn2)}`)

})


app.listen(5000,()=>{
    console.log("aliooooo")
})
