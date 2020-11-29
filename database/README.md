### How to run
Run `npm install` and then `npm start` in this folder.

Get all users:
```bash
curl -XGET http://localhost:5000/users
```

Add a user:
```bash
curl -XPOST --header "Content-Type: application/json" \
--data '{"firstName": "Johny", "lastName": "Smith"}' \
http://localhost:5000/users
```