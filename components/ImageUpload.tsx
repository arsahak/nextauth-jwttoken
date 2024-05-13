import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { title } from 'process';
import { useSession } from 'next-auth/react';

const ImageUpload: React.FC = () => {
  const { data: session } = useSession();
  const [preview, setPreview] = useState<string>("");

  const handSendFile = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!preview) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/news",
        {
          title: "This is demo title from client",
          body: "To upload an image in a React TypeScript (TS) application using a REST API endpoint, you can follow a similar approach to the JavaScript version. TypeScript adds static typing to your code, which can help catch errors during development. Here's how you can do it",
          image: preview,
          author: "arsahak"
        },
        {
          headers: {
            authorization: `${session?.user.token}`
          }
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (reader.result) {
          setPreview(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Image upload</h1>
      <form onSubmit={handSendFile}>
        <input type='file' onChange={handFileUpload} />
        <button type="submit" className='bg-slate-600 text-white px-6 py-2'>Upload</button>
       {
        preview && <img src={preview} alt="Preview" />
       }
      </form>
    </div>
  );
};

export default ImageUpload;
