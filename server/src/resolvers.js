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

module.exports = resolvers;
