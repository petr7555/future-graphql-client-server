import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import UsersFilteredList from "./components/UsersFilteredList";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        <div>
          <UsersList />
          <UserForm />
        </div>
        <UsersFilteredList />
      </div>
    </ApolloProvider>
  );
};

export default App;
