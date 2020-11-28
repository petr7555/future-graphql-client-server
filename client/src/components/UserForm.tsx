import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { User } from "../types/types";
import { GET_USERS } from "./UsersList";

const ADD_USER = gql`
  mutation AddUser($firstName: String, $lastName: String) {
    addUser(firstName: $firstName, lastName: $lastName) {
      fullName
    }
  }
`;

interface GetUsersResult {
  users: [User];
}

const UserForm = () => {
  const [addUser] = useMutation(ADD_USER);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addUser({
      variables: { firstName, lastName },
      update: (cache, { data: { addUser: addedUser } }) => {
        const oldData = cache.readQuery<GetUsersResult>({ query: GET_USERS });
        if (oldData === null) return;
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...oldData.users, addedUser],
          },
        });
      },
    });

    setFirstName("");
    setLastName("");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <input
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <input
          value={lastName}
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
