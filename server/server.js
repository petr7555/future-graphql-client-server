const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
 
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    fullName: `${this.firstName} ${this.lastName}` 
  },
  {
    firstName: 'Anne',
    lastName: 'Smith',
    fullName: `${this.firstName} ${this.lastName}` 
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
  }

  type Mutation {
    addUser(firstName: String, lastName: String): User
  }
`;
 
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, { firstName, lastName }, __) => {
      const newUser = {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}` 
      };
      users.push(newUser);
      return newUser;
    }
  }
};
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);