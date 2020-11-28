h3. How to run
Run `node server.js` in this folder, then go to `http://localhost:4000/graphql`.

h3. Get all users
```qraphql
query GetUsers {
  users {
    fullName
  }
}
```

h3. List users by part of their full name
```qraphql
query ListUsersByPartOfFullName {
  usersByFullName (substring: "Joh") {
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