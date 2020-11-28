import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import UsersFilteredList from "./components/UsersFilteredList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div style={{ display: "flex" }}>
        <UsersList />
        <UsersFilteredList />
      </div>
      <UserForm />
    </ApolloProvider>
  );
};

export default App;
