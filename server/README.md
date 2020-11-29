### How to run
Run `npm install` and then `npm start` in this folder, 
then go to http://localhost:4000/.

### Get all users
```qraphql
query GetUsers {
  users {
    fullName
  }
}
```

### Get users whose full name contains some string
```qraphql
query UsersByPartialName {
  usersByPartialName (partOfName: "Joh") {
    fullName
  }
}
```

### Add a new user
```qraphql
mutation AddUser {
  addUser(firstName: "Johny", lastName: "Smith") {
    fullName
  }
}
```