"use client";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleImageDropzone } from "./imageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { createPost } from "@/app/actions/blog";

type Props = {
  user: any;
};

export default function CreateForm({ user }: Props) {
  const form = useForm();
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [imagePath, setImagePath] = useState("");

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
    }
  }, [file]);

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
              onChange={(file) => {
                setFile(file);
              }}
              width={200}
              height={200}
              value={file}
            />

            <Form {...form}>
              <form
                className="flex flex-col gap-5 mt-5"
                onSubmit={() => setFile(undefined)}
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} value={imagePath} type="hidden" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Title"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Textarea
                  required
                  name="description"
                  rows={10}
                  placeholder="Write Here..."
                ></Textarea>
                <Select name="category" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Culture">Culture</SelectItem>
                    <SelectItem value="Journey">Journey</SelectItem>
                    <SelectItem value="Discovery">Discovery</SelectItem>
                    <SelectItem value="Wanderlust">Wanderlust</SelectItem>
                    <SelectItem value="Odyssey">Odyssey</SelectItem>
                    <SelectItem value="Exploration">Exploration</SelectItem>
                  </SelectContent>
                </Select>

                <Input name="email" type="hidden" value={user?.email || ""} />

                <Button type="submit" onClick={() => createPost}>
                  Create blog
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
