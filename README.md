## Heroku deployment
[subdir-heroku-buildpack](https://elements.heroku.com/buildpacks/timanovsky/subdir-heroku-buildpack) 
allows deploying from a subdirectory. I can deploy two Heroku apps from the same repository.
1. Create two heroku apps: `future-graphql-server` and `future-graphql-client`.
2. Set them both to deploy from GitHub.
3. For server run:
    ```bash
    heroku buildpacks:clear --app future-graphql-server
    heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app future-graphql-server
    heroku buildpacks:add heroku/nodejs --app future-graphql-server
    heroku config:set PROJECT_PATH=server --app future-graphql-server
    ```
4. For client run:
    ```bash
    heroku buildpacks:clear --app future-graphql-client
    heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app future-graphql-client
    heroku buildpacks:add https://github.com/mars/create-react-app-buildpack.git --app future-graphql-client
    heroku config:set PROJECT_PATH=client --app future-graphql-client
    heroku config:set REACT_APP_API_URL=https://future-graphql-server.herokuapp.com/ --app future-graphql-client
    ```
5. Server listens on `process.env.PORT || 4000`
6. Client connects to `process.env.REACT_APP_API_URL || "http://localhost:4000/graphql"`
7. Re-deploy both apps