const express = require("express")
const { PostModel } = require("../models/post.model")

const postRouter = express.Router()

//get all the post
postRouter.get("/posts", async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})
//this endpoint get porticular data
postRouter.get("/posts/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const posts = await PostModel.find({ _id: id })
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})
//user to create a new post.

postRouter.post("/posts", async (req, res) => {
    try {
        const { user, text, image } = req.body
        const data = new PostModel({ user, text, image })
        await data.save()

        res.status(201).send({ "msg": "Post data created" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})

//update image or text specific post
postRouter.patch("/posts/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const { text, image } = req.body

        let data = await PostModel.findByIdAndUpdate({ _id: id }, { text, image })

        res.status(204).send({ "msg": "Post data Updated", "data": data })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})

//delete data

postRouter.delete("/posts/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await PostModel.findByIdAndDelete({ _id: id })

        res.status(202).send({ "msg": "Post data deleted" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})


//post like

postRouter.post('posts/:id/like', async (req, res) => {
    let id = req.params.id;
    let userID = req.body.userID;
    try {
        let post = await PostModel.findById(id);
        console.log(post)
        post.likes.push(userID);
        await post.save();
        res.status(202).send("Post like successfully")
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//post comment
postRouter.post('posts/:id/comment', async (req, res) => {
    let id = req.params.id;
    try {
        let post = await PostModel.findById(id);
        post.comments.push(req.body);
        await post.save();
        res.status(202).send("comment added successfully")
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = { postRouter }