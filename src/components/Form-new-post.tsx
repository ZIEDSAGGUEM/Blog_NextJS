"use client";
import { FormData } from "@/types/blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const { data } = useSession();
  const router = useRouter();
  console.log(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/posts", formData);
      router.push(`/blogs/${response.data.newPost.id}`);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="w-full max-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            placeholder="Enter a Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <ReactTextareaAutosize
            minRows={5}
            name="content"
            placeholder="Enter a content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className=" bg-blue-500 hover:bg-blue-600 text-white  font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-fulll disabled:bg-gray-400"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default FormNewPost;
