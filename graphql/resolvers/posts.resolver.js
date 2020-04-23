const Post = require('../../models/Post.model');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, {postId}){
      try {
        const post = Post.findById(postId);
        if(post){
          return post;
        }else{
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createPost(_, {body}, context){
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      return post;
    }
  }
}