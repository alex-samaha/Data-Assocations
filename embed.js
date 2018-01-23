// this program embeds data into models
// it shows how you can embed Posts into Users
// part of the data associations unit
// import modules
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');


// POST model - title, content
var postSchema= new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER model - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // pass the schema - tells it it's an array of posts
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


var newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione Granger",
});

newUser.posts.push({
    title: "How to brew polyjuice potion",
    content: "Just kidding. Go to potions class to learn it!"
});

// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err);
//     }
//     else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are really good"
// });

// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(post);
//     }
// });

// finds one user based on given search criteria
User.findOne({name: "Hermione Granger"}, function(err, user) {
    if(err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort, Voldemort, & Voldemort"
        });
        user.save(function(err, user) {
            if(err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        });
    }
});