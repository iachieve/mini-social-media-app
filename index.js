const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index.resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('connected to mongodb'); })
  .catch(err => console.log('==> db network failure', err));

server.listen({ port: PORT })
.then(res =>{
  console.log(`server is running at ${res.url}`);
});