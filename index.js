const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');

const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    createdAt: String!
  }
  type Query{
    getPosts:[Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts(){
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('connected to mongodb'); })
  .catch(err => console.log('==> db network failure', err));


server.listen({ port: PORT })
.then(res =>{
  console.log(`server is running at ${res.url}`);
});