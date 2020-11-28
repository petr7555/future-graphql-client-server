h3. How to run
Run `node server.js` in this folder, then go to `http://localhost:4000/graphql`.

h3. List all users
```qraphql
query ListAllUsers {
  users {
    fullName
  }
}
```

h3. Add a user
```qraphql
mutation NewUser {
  addUser(firstName: "Johny", lastName: "Smith") {
    fullName
  }
}
```