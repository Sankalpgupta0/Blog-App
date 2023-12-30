// AddPost page is PostForm

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RTE from "./RTE.jsx";
import storageService from "../appwrite/storage.js";
import dataBaseService from "../appwrite/database.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  let userData =useSelector((state) => state.AuthReducer.userData);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  

  // SAMAJ-AAO
  const submit = async (data) => {
    if (post) {
        console.log("hi");
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await dataBaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await storageService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await dataBaseService.createPost({
          userID: userData.$id,
            ...data,
        });

        if (dbPost) {
          navigate(`/all-posts`);
        }
      }
    }
  };
  // SAMAJ-AAO

  // slug-transform
  useEffect(() => {
    setSlug(title.toLowerCase().replace(/ /g, "-"));
  }, [title]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <input
          label="Title :"
          placeholder="Title"
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4`}
          {...register("title", { required: true })}
          value={title}
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
        <input
          label="Slug :"
          placeholder="Slug"
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4`}
          {...register("slug", { required: true })}
          readOnly
          value={slug}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <input
          label="Featured Image :"
          type="file"
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4`}
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <select
          label="Status"
          className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
          {...register("status", { required: true })}
        >
          <option key="active" value="active">
            active
          </option>
          <option key="inactive" value="inactive">
            inactive
          </option>
        </select>
        <button
          type="submit"
          className={`hover:bg-blue-800 w-full px-4 py-2 rounded-lg bg-blue-600 text-white ${
            post ? "bg-green-500" : undefined
          }`}
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
