const postResolver = require('./posts.resolver');
const userResolver = require('./users.resolver');
const commentsResolver = require('./comments.resolver');

module.exports = {
  Post:{
    likeCount(parent){
      return parent.likes.length;
    },
    commentCount:(parent) => parent.comments.length
  },
  Query:{
    ...postResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentsResolver.Mutation
  }
}