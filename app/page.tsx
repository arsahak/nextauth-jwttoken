"use client";

import Button from "@elements/Button";
import ImageUpload from "components/ImageUpload";
import NewsBlog from "components/NewsBlog";
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
      <div className="mt-10 ml-10 flex">
        <div className="flex-1">
          <ImageUpload/>
        </div>
        <div className="flex-1">
          <NewsBlog/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
