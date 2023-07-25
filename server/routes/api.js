//The main API routes for the application
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const textValidate = () => body('text').isString().exists().trim().bail();
const titleValidate = () => body('title').isString().exists().trim().bail();
const postIDValidate = () => body('post').isString().exists().trim().bail();
const usernameValidate = () => body('username').isString().exists().trim().bail();


//GET all posts that are exist
router.get('/posts', async(req, res) => {
   const posts = await Post.find().populate('user', 'username');
   res.send(posts);
});

//GET all comments for a post by post ID
router.get('/comments/:postId', async(req, res) =>{
    const comments = await Comment.find({post: req.params.postId}).populate('user', 'username');
    res.send(comments);
});

//POST for new post
router.post('/post', textValidate(), titleValidate(), passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const { title, text} = req.body;
        let ID;
        req.user.then(userData => {
            ID = userData._id;
            const post = new Post({title: title, text: text, user: ID});
            post.save();
            return res.status(200).json({message: "Post created!"});
        })
    }
    catch(error){
        return res.status(500).json({error: "Failed to create post!"});
    }
});
//DELETE for post
router.delete('/post/:postId', passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){return res.status(404).json({error: "Post not found"});}
        
        req.user.then(userData => {
            if(userData._id.equals(post.user) || userData.adminStatus === true){
                post.deleteOne();
                return res.status(200).json({message: "Post deleted!"});

            }
            else{
                return res.status(403).json({error: "You are not the owner!"});
            }
        })
    }
    catch(error){
        res.status(500).json({error: "Deleting post failed!"});
    }
});
//PUT for post
router.put('/post/:postId', textValidate(), titleValidate(), passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){return res.status(404).json({error: "Post not found"});}

        const {title, text} = req.body; 
        req.user.then(userData => {
            if(userData._id.equals(post.user) || userData.adminStatus === true){
                post.updateOne({title: title, text: text}).exec();
                return res.status(200).json({message: "Post updated!"});
            }
            else{
                return res.status(403).json({error: "You are not the owner!"});
            }
        })
    }
    catch(error){
        res.status(500).json({error: "Updating post failed!"});
    }
});
//POST for new comment
router.post('/comment', textValidate(), postIDValidate(), passport.authenticate('jwt', {session: false}), (req, res) =>{
    try{
        const { text, post } = req.body;
        let ID;
        req.user.then(userData => {
            ID = userData._id;
            const comment = new Comment({text: text, post: post, user: ID});
            comment.save();
            return res.status(200).json({message: "Comment saved"});
        })
    }
    catch(error){
        return res.status(500).json({error: "Failed to save comment!"})
    }
});
//DELETE for comment
router.delete('/comment/:commentId', passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){return res.status(404).json({error: "Comment not found"});}

        req.user.then(userData => {
            if(userData._id.equals(comment.user) || userData.adminStatus === true){
                comment.deleteOne();
                return res.status(200).json({message: "Comment deleted!"});

            }
            else{
                return res.status(403).json({error: "You are not the owner!"});
            }
        })
    }
    catch(error){
        res.status(500).json({error: "Deleting comment failed!"});
    }
});
//PUT for comment
router.put('/comment/:commentId', textValidate(), passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){return res.status(404).json({error: "Comment not found"});}

        const { text} = req.body; 
        req.user.then(userData => {
            if(userData._id.equals(post.user) || userData.adminStatus === true){
                comment.updateOne({text: text}).exec();
                return res.status(200).json({message: "Comment updated!"});
            }
            else{
                return res.status(403).json({error: "You are not the owner!"});
            }
        })
    }
    catch(error){
        res.status(500).json({error: "Updating comment failed!"});
    }
});
//UPDATE for user to set their username. Features many redundant checks just to be sure, and allowing the super admin to change other users' names :D
router.put('/user/:userId', usernameValidate(), passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        if(!user){return res.status(404).json({error: "User not found"});}

        const username = req.body.username;
        req.user.then(userData => {
            if(userData._id.equals(user._id) || userData.adminStatus === true){
                user.updateOne({username: username}).exec();
                return res.status(200).json({message: "Username updated!"});
            }
            else{
                return res.status(403).json({error: "You are not authorized"});
            }
        })
    }
    catch(error){
        res.status(500).json({error: "Updating username failed!"});
    }
});
//DELETE for user
router.delete('/user/:userId', passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        if(!user){return res.status(404).json({error: "User not found"});}

        req.user.then(userData => {
            if(userData._id.equals(user._id) || userData.adminStatus === true){
                user.deleteOne();
                return res.status(200).json({message: "User deleted. Goodbye!"});
            }
            else{
                return res.status(403).json({error: "You are not authorized"});
            }
        })
    }
    catch(error){
        res.status(500).json({error: "Deleting user failed!"});
    }
});
//GET all users for the super admin to see and manage
router.get('/users', passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const users = await User.find();
        if(!users){return res.status(404).json({error: "No users"});}

        req.user.then(userData => {
            if(!userData){
                return res.status(403).json({error: "Error!"});
            }
            else if(userData.adminStatus === true){
                res.send(users); 
            }
            else{
                return res.status(403).json({error: "Error!"});
            }
        })

    }
    catch(error){
        res.status(500).json({error: "Error"});
    }
});
//Fear the super admin

module.exports = router;