const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
  },
  {
    firstName: "Anne",
    lastName: "Smith",
    fullName: "Anne Smith",
  },
];

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    fullName: String
  }

  type Query {
    users: [User]
    usersByFullName(substring: String): [User]
  }

  type Mutation {
    addUser(firstName: String, lastName: String): User
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    usersByFullName: (_, { substring }, __) =>
      users.filter((user) =>
        user.fullName.toLowerCase().includes(substring.toLowerCase())
      ),
  },
  Mutation: {
    addUser: (_, { firstName, lastName }, __) => {
      const newUser = {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
