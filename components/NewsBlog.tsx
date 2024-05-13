"use client";

import Button from "@elements/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";


const NewsBlog = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  const fetchPost = async () => {
    const res = await fetch("http://localhost:4000/api/users/news", {
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
       <Button onClick={fetchPost}>Get News Posts</Button>
       {posts && JSON.stringify(posts)}
       {/* {
        posts?.map((post:string, index:number)=><div key={post._id}>{post.title}</div>)
       } */}
        {/* {posts && posts.map((post:string, index:number) => (
          <div key={post._id}> 
            <h1>{post.title}</h1>
            <h5>{post.body}</h5> 
            <div>
              <Image
                src={post.image}
                width={500}
                height={500}
                alt="Picture of the author"
              />
              <p>{post.author}</p>
            </div>
          </div>
        ))} */}
      
    </div>
  );
};

export default NewsBlog;
