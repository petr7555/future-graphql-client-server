const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const UserAPI = require("./src/userApi");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI(),
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
