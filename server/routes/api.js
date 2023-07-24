//The main API routes for the application
var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    req.user.then(data => console.log(data._id)); //REMENBER THIS
    res.send("Hello!")
});
//GET all posts that are exist
router.get('/posts', (req, res) => {

});
//GET all comments for a post by post ID
router.get('/comments/:postId', (req, res) =>{

});
//POST for new post
router.post('/post', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//DELETE for post
router.delete('/post/:postId', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//PUT for post
router.put('/post/:postId', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//POST for new comment
router.post('/comment', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//DELETE for comment
router.delete('/comment/:commentId', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//PUT for comment
router.put('/comment/:commentId', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//UPDATE for user to set their username
router.put('/user/:userId', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//DELETE for user
router.delete('/user/:userId', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//GET all users for the super admin to see
router.get('/users', passport.authenticate('jwt', {session: false}), (req, res) =>{

});
//Fear the super admin

//Functions to define if user has rights for the action they are about to do
//Only post or comment owner or super admin can edit or delete data
function postOwnership(){

}

function commentOwnership(){

}

module.exports = router;