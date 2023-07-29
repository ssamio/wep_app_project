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


//GET all posts that exist
router.get('/posts', async(req, res) => {
   const posts = await Post.find().populate('user', 'username');
   if(posts){
    res.send(posts);
   }
   else{
    res.status(404).json({error: "Posts not found"});
   }
});

//GET all comments for a post by post ID
router.get('/comments/:postId', async(req, res) =>{
    const comments = await Comment.find({post: req.params.postId}).populate('user', 'username');
    if(comments){
        res.send(comments);
    }
    else{
        res.status(404).json({error: "Comments not found"});
    }
});

//POST for new post
router.post('/post', textValidate(), titleValidate(), passport.authenticate('jwt', {session: false}), async(req, res) =>{
    //Validate content
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: "Invalid content"});
    }
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
//DELETE for post. Also removes all comments that belong to that post
router.delete('/post/:postId', passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){return res.status(404).json({error: "Post not found"});}
        
        req.user.then(userData => {
            if(userData.id.equals(post.user) || userData.adminStatus === true){
                post.deleteOne().exec();
                Comment.deleteMany({post: post._id}).exec();
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
    //Validate content
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: "Invalid content"});
    }
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
    //Validate content
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: "Invalid content"});
    }
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
                comment.deleteOne().exec();
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
    //Validate content
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: "Invalid content"});
    }
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
    //Validate content
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: "Invalid content"});
    }
    try{
        const targetUser = await User.findById(req.params.userId);
        if(!targetUser){return res.status(404).json({error: "User not found"});}

        const username = req.body.username;
        const preExist = await User.findOne({username: username});
        if(preExist) return res.status(403).json({error: "Username taken!"});
        
        req.user.then(userData => {
            if(userData._id.equals(targetUser._id) || userData.adminStatus === true){
                targetUser.updateOne({username: username}).exec();
                return res.status(200).json({message: "Username updated! Login again to apply changes."});
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
        const targetUser = await User.findById(req.params.userId);
        if(!targetUser){return res.status(404).json({error: "User not found"});}

        req.user.then(userData => {
            if(userData._id.equals(targetUser._id) || userData.adminStatus === true){
                //Delete user
                targetUser.deleteOne();
                //Find all posts the user has made
                const userPosts = Post.find({user: targetUser._id});
                //Delete all posts the user has made
                Post.deleteMany({user: targetUser._id}).exec();
                //Delete all comments the user has made
                Comment.deleteMany({user: targetUser._id}).exec();
                
                //Delete all comments from posts that no longer exist
                for(let i = 0; i < userPosts.length; i++){
                    Comment.deleteMany({post: userPosts[i]._id}).exec();
                }
                
                return res.status(200).json({message: "User deleted. Goodbye! :)"});
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
//GET username from database. This is to show it after update
router.get('/name/:userId', passport.authenticate('jwt', {session: false}), async(req, res) =>{
    try{
        const targetUser = await User.findById(req.params.userId);   
        if(!targetUser){return res.status(404).json({error: "User not found"});}
        else {
            res.status(200).send(targetUser.username);
        }
    }
    catch(error){
        res.status(500).json({error: "Error"});
    }
});

module.exports = router;