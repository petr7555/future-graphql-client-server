const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");

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

const resolvers = {
  Query: {
    users: (_, __, { dataSources }) => {
      return dataSources.userAPI.getUsers();
    },
    usersByPartialName: async (_, { partOfName }, { dataSources }) => {
      const users = await dataSources.userAPI.getUsers();
      return users.filter((user) =>
        user.fullName.toLowerCase().includes(partOfName.toLowerCase())
      );
    },
  },
  Mutation: {
    addUser: (_, { firstName, lastName }, { dataSources }) =>
      dataSources.userAPI.addUser({ firstName, lastName }),
  },
};

const getWithFullName = (users) => {
  return users.map((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }));
};

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_URL;
  }

  async getUsers() {
    return this.get("users").then((users) => getWithFullName(users));
  }

  async addUser(user) {
    return this.post("users", user).then((user) => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
    }));
  }
}

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
