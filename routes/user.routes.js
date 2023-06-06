const express=require("express")

const {UserModel}=require("../models/user.model")

const{FriendModel}=require("../models/friend.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

//get all users
userRouter.get("/users",async(req,res)=>{
    try {
        let usersdata=await UserModel.find()
        res.status(201).send(usersdata)
    } catch (error) {
        res.status(404).send({"msg":"something went wrong","error":error.message})
    }
})


//user registrations

userRouter.post("/register",async(req,res)=>{
    let posts=[];
    let friends=[];
    let friendRequests=[]
    const {name,email,password,dob,bio}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            res.send({"msg":"User Already Register"})
        }else{
            bcrypt.hash(password,5,async function(err,hash){
                if(err){
                    res.send({"msg":"Something Wrong"})
                }else{
                    const user=new UserModel({name,email,password:hash,dob,bio,posts,friends,friendRequests})
                    await user.save()
                    res.status(201).send({"msg":"New user Register"})
                }
            })
        }
    } catch (error) {
        res.status(404).send({"msg":"something went wrong","error":error.message})
    }
})

//user login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai",{expiresIn:"7d"})
                    res.status(201).send({"msg":"Successfully login","token":token,"user":user[0]._id})
                }
            })
        }else{
            res.send({"msg":"Wrong Creadential"})
        }
    } catch (error) {
        res.status(404).send({"msg":"something went wrong","error":error.message})
    }
})



//users get  id by friends

userRouter.get("/users/:id/friends",async(req,res)=>{
    try {
        let id=req.params.id

        let user=await UserModel.find({_id:id})

        let userfrddata=user[0].friends

        res.status(200).send(userfrddata)
    } catch (error) {
        res.status(404).send({"msg":"something went wrong","error":error.message})
    }
})

//send frd request to other user
userRouter.post("/users/:id/friends",async(req,res)=>{
    try {
        let id=req.params.id
        let {user,status}=req.body
        let frddat=new FriendModel({user,status})
        let userdata=await UserModel.find({_id:id})

        userdata[0].friends.push(frddat)
        await userdata[0].save()

        res.status(200).send({"msg":"frd request send"})
    } catch (error) {
        res.status(404).send({"msg":"something went wrong","error":error.message})
    }
})



module.exports={userRouter}