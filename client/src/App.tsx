import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UsersList />
      <UserForm />
    </ApolloProvider>
  );
};

export default App;
