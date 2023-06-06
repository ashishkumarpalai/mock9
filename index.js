const express=require("express")
const {connection}=require("./configs/db")
const{userRouter}=require("./routes/user.routes")
const{postRouter}=require("./routes/post.routes")
const {authentication}=require("./middleware/auth.middleware")

require("dotenv").config()

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Wellcome to the Social media app")
})
app.use(authentication)
app.use("/api",userRouter)
app.use("/",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB Connected")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server is running Port :-${process.env.port}`)
})