const postResolver = require('./posts.resolver');
const userResolver = require('./users.resolver');

module.exports = {
  Query:{
    ...postResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation
  }
}