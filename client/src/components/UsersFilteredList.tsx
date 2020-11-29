import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

type User = {
  fullName: string;
};

export const GET_USERS_BY_PARTIAL_NAME = gql`
  query UsersByPartialName($partOfName: String) {
    usersByPartialName(partOfName: $partOfName) {
      fullName
    }
  }
`;

const UsersFilteredList = () => {
  const [input, setInput] = useState("");
  const { loading, error, data, refetch } = useQuery(
    GET_USERS_BY_PARTIAL_NAME,
    {
      variables: { partOfName: input },
    }
  );

  return (
    <div>
      <input
        value={input}
        placeholder={"Search"}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
      {!loading && !error && (
        <ul>
          {data.usersByPartialName.map((user: User, index: number) => (
            <li key={index}>{user.fullName}</li>
          ))}
        </ul>
      )}
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export default UsersFilteredList;
