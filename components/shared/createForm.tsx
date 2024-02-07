"use client";

import Image from "next/image";
import Form from "./form";
import { Input } from "../ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SingleImageDropzone } from "./imageDropzone";
import { userTypes } from "@/types/userTypes";
import { createPost } from "@/app/actions/blog";
import { convertFileToUrl } from "@/lib/utils";

type Props = {
  user: userTypes
};

const CreateForm = ({ user }: Props) => {
  const [file, setFile] = useState<File | undefined>();
  const { edgestore } = useEdgeStore();
  const [imagePath, setImagePath] = useState("");
  const [url, setUrl] = useState<string>("");

  const uploadImageHandler = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      setImagePath(res.url);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImageHandler();
      setUrl(convertFileToUrl(file));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  function setFileHandler() {
    setFile(file);
  }

  return (
    <div className="mt-8 mx-auto w-full max-w-3xl px-4">
      <div className="bg-white py-8 shadow rounded-lg px-10">
        <h1 className="text-center text-2xl font-extrabold mb-10">
          Create a Post ✍️
        </h1>
        {!user ? (
          <h2 className="text-center text-xl font-extrabold uppercase">
            Please Sign up or Log in to create a post!
          </h2>
        ) : (
          <>
              <SingleImageDropzone
                onChanged={(file: SetStateAction<File | undefined>) => {
                  setFile(file)
                }}
                width={200}
                height={200}
                valued={file}
              />
            <Form
              action={createPost}
              className="flex flex-col gap-5 mt-5"
              onSubmit={() => setFile(undefined)}
            >
              <Input type="hidden" name="image" value={imagePath} />
              <Input name="title" type="text" placeholder="Enter Title" />
              <textarea
                required
                name="description"
                rows={10}
                placeholder="Write Here..."
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
              ></textarea>
              <select
                name="category"
                required
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
              >
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Journey">Journey</option>
                <option value="Discovery">Discovery</option>
                <option value="Wanderlust">Wanderlust</option>
                <option value="Odyssey">Odyssey</option>
                <option value="Exploration">Exploration</option>
              </select>

              <Input name="email" type="hidden" value={user?.email || ""} />

              <Button type="submit">Create blog</Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
