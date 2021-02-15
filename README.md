## Where can I see this application running?
Visit https://future-graphql-client.herokuapp.com/ to see the application running.
It uses GraphQL API located at https://future-graphql-server.herokuapp.com/.
The GraphQL API is connected to PostgreSQL database running at https://future-graphql-database.herokuapp.com/.

## How to run locally?
Execute `npm install` and `npm start` in all subdirectories of this repository.
Then go to http://localhost:3000/.

## Heroku deployment
[subdir-heroku-buildpack](https://elements.heroku.com/buildpacks/timanovsky/subdir-heroku-buildpack) 
allows deploying from a subdirectory. I can deploy three Heroku apps from the same repository.
1. Create three heroku apps: `future-graphql-database`, `future-graphql-server` and `future-graphql-client`.
2. Set them all to deploy from GitHub.
3. For database run:
    ```bash
    heroku buildpacks:clear --app future-graphql-database
    heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app future-graphql-database
    heroku buildpacks:add heroku/nodejs --app future-graphql-database
    heroku config:set PROJECT_PATH=database --app future-graphql-database
    ```
4. For server run:
    ```bash
    heroku buildpacks:clear --app future-graphql-server
    heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app future-graphql-server
    heroku buildpacks:add heroku/nodejs --app future-graphql-server
    heroku config:set PROJECT_PATH=server --app future-graphql-server
    heroku config:set REST_URL=https://future-graphql-database.herokuapp.com/ --app future-graphql-server
    ```
5. For client run:
    ```bash
    heroku buildpacks:clear --app future-graphql-client
    heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app future-graphql-client
    heroku buildpacks:add https://github.com/mars/create-react-app-buildpack.git --app future-graphql-client
    heroku config:set PROJECT_PATH=client --app future-graphql-client
    heroku config:set REACT_APP_API_URL=https://future-graphql-server.herokuapp.com/ --app future-graphql-client
    ```
6. Server listens on `process.env.PORT || 4000`
7. Client connects to `process.env.REACT_APP_API_URL || "http://localhost:4000/graphql"`
8. Re-deploy both apps
