import React, { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Link } from "react-router-dom";

export default function Submission() {
  const [value, setValue] = useState("");
  const [submitButton, setSubmitButton] = useState("Submit");
  const [submissionDetails, setSubmissionDetails] = useState({
    username: "",
    language: "c++",
    stdin: "",
  });

  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  const handleChange = (e) => {
    setSubmissionDetails((prevFields) => {
      return {
        ...prevFields,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitButton("Submitting...");

    if (!submissionDetails.username || !submissionDetails.language || !value) {
      setSubmitButton("Submit");
      return alert("All fields are required");
    }
    if (!submissionDetails.username.match(/^[a-zA-Z0-9]+$/)) {
      setSubmitButton("Submit");
      return alert("Invalid username");
    }
    if (submissionDetails.stdin.length > 100) {
      setSubmitButton("Submit");
      return alert("Stdin is too long");
    }
    if (value.length > 2000) {
      setSubmitButton("Submit");
      return alert("Stdin is too long");
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...submissionDetails,
        code: value,
      }),
    };

    const response = await fetch(
      "https://tuf-interview.vercel.app/api/submit",
      options
    );
    const result = await response.json();

    if (result.error) {
      setSubmitButton("Submit");
      return alert("Submission failed");
    }

    alert("Submission successful!");
    setSubmitButton("Submit");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-4xl text-center text-gray-800 mb-6 font-bold absolute top-10">
        Submission Form
      </h1>
      <Link
        to="/submissions"
        className="font-semibold underline absolute top-14 right-16"
      >
        Go to submissions
      </Link>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4 mx-16">
          <label htmlFor="username" className="text-gray-700 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={submissionDetails.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6 mx-16">
          <label htmlFor="language" className="text-gray-700 font-semibold">
            Select language
          </label>
          <select
            id="language"
            name="language"
            value={submissionDetails.language}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="mb-6 mx-16">
          <label htmlFor="stdin">Std IN</label>
          <textarea
            type="text"
            id="stdin"
            name="stdin"
            onChange={handleChange}
            value={submissionDetails.stdin}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter your stdin"
          ></textarea>
        </div>
        <CodeMirror
          value={value}
          height="200px"
          onChange={onChange}
          className="mx-16 border"
        />
        <div className="flex items-center justify-center mt-4 mx-16">
          <button
            type="submit"
            disabled={submitButton === "Submit" ? false : true}
            className={`px-6 py-1 w-full border border-black bg-black text-white rounded-md focus:outline-none ${
              submitButton !== "Submit" && "cursor-not-allowed"
            }`}
          >
            {submitButton}
          </button>
        </div>
      </form>
    </div>
  );
}
