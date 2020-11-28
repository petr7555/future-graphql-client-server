import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import UsersList from "./components/UsersList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UsersList />
    </ApolloProvider>
  );
};

export default App;
