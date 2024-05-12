"use client";

import Button from "@elements/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  const fetchPost = async () => {
    const res = await fetch("http://localhost:4000/api/users/profile", {
      method: "Get",
      headers: {
        authorization: `${session?.user.token}`,
      },
    });
    const response = await res.json();
    setPosts(response);
  };
  return (
    <div>
      <Button onClick={fetchPost}>Get User Posts</Button>
      {posts && JSON.stringify(posts)}
    </div>
  );
};

export default HomePage;
