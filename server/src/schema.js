const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    fullName: String
  }

  type Query {
    users: [User]
    usersByPartialName(partOfName: String): [User]
  }

  type Mutation {
    addUser(firstName: String, lastName: String): User
  }
`;

module.exports = typeDefs;
