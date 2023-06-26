import Post from '../models/Post.js';
import User from '../models/User.js';

/* create */

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(id);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();
        
        const post = await Post.find(); // grabbing all the posts and sent to front end
        res.status(201).json(post); 
    } catch (err)
    {
        res.status(409).json({message : err.message})
    }
}





/*READ */

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); 
        res.status(200).json(post); 
    } catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

//user feed post - posts of a particular user
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.findById({userId});
        res.status(200).json(post); 
    } catch (err)
    {
        res.status(404).json({message : err.message})
    }

}


/*UPDATE*/

export const likePosts = async (req, res) => {

    try {
        const {id} = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        //get post, in that post if user id exists under likes, if yes that post is liked

        if(isLiked) { 
            post.likes.delete(userId); // deletes if it exists
        }
        else {
            post.likes.set(userId, true); //likes if it wasnt liked
        }

        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes}, {new:true})


        res.status(200).json(updatedPost); 
    } catch (err)
    {
        res.status(404).json({message : err.message})
    }
}