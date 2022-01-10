import mongoose from 'mongoose';
import Posts from '../models/postModel.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message:error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new Posts(body)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

}

export const updatePost = async (req, res) => {
    const { id:_id } = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id')
    const updatedPost = await Posts.findByIdAndUpdate(_id, { _id, ...post }, { new: true })
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('No post with that id')
    }
    await Posts.findByIdAndRemove(id)
    res.json({
        message: 'Post deleted Successfully'
    })
}
export const likePost = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('No post with that id')
    }

    const post = await Posts.findById(id)
    const updatedPost = await Posts.findByIdAndUpdate(id, { likecount: post.likecount+1 }, { new: true })
    res.json(updatedPost)
}