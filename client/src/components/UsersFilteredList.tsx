import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

type User = {
  fullName: string;
};

export const GET_USERS_BY_FULLNAME = gql`
  query UsersByFullName($substring: String) {
    usersByFullName(substring: $substring) {
      fullName
    }
  }
`;

const UsersFilteredList = () => {
  const [input, setInput] = useState("");
  const { loading, error, data } = useQuery(GET_USERS_BY_FULLNAME, {
    variables: { substring: input },
  });

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
      {error && <p>`Error! ${error.message}`</p>}
      {!loading && !error && (
        <ul>
          {data.usersByFullName.map((user: User, index: number) => (
            <li key={index}>{user.fullName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersFilteredList;
