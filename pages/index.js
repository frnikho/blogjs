import UserProfile from "../components/UserProfile";
import * as user from "../lib/user";
import React from "react";

export default function Home({response}) {
  const refreshData = () => {
    response = getStaticProps();
  }
  return (
    <div key="users">
      <h1>Users</h1>
      {response.map((user) => {
        return <UserProfile user={user}/>
      })}
    </div>
  )
}

export async function getStaticProps(context) {

  let users = await user.getAllUser();

  users.map((user) => {
    console.log(user);
  })

  return {
    props: {
      response: users
    }
  }
}
