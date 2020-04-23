const postResolver = require('./posts.resolver');
const userResolver = require('./users.resolver');
const commentsResolver = require('./comments.resolver');

module.exports = {
  Query:{
    ...postResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentsResolver.Mutation
  }
}