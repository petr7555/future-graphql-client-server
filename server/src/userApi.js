const { RESTDataSource } = require("apollo-datasource-rest");

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_URL;
  }

  async getUsers() {
    return this.get("users");
  }

  async addUser(user) {
    return this.post("users", user);
  }
}

module.exports = UserAPI;
