const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB, PORT } = require('./config');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typedefs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

mongoose.connect(MONGODB, { userNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB server...");
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Running server at ${res.url}`);
    });
