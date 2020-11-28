import React from "react";
import { gql, useQuery } from "@apollo/client";

type User = {
  fullName: string;
};

export const GET_USERS = gql`
  query GetUsers {
    users {
      fullName
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <ul>
        {data.users.map((user: User, index: number) => (
          <li key={index}>{user.fullName}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
