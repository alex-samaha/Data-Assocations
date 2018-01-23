// this program embeds data into models
// it shows how you can have Posts into Users using references
// posts are stored in the User model as IDs to reference the actual posts
// part of the data associations unit
// import modules
var mongoose = require('mongoose');
console.log(mongoose.version);

mongoose.connect('mongodb://localhost/blog_demo_2');

mongoose.Promise = global.Promise;


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
    // in the user schema, there is a posts attribute - an array
    // It's an array of object IDs belonging to a post
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
    }
    ]
});

var User = mongoose.model("User", userSchema);

// 1. Create Post
// 2. Find User
// 3. Add post to that user
// 4. Save the user
Post.create({
    title: "Title",
    content: "Content Section"
}, function(err, post) {
    console.log(post._id);
    // find a user after creating the post
    User.findOne({email: "bob@gmail.com"}, function(err, user) {
        if(err) {
            console.log(err);
        }
        else {
            user.posts.push(post);
            user.save(function(err, data) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });
        }
    });
});

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });
