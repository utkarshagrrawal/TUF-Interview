import React, { useCallback, useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { Link } from "react-router-dom";


export default function Submission() {
    const [value, setValue] = useState("");
    const [submissionDetails, setSubmissionDetails] = useState({ username: "", language: "" });

    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    const handleChange = (e) => {
        setSubmissionDetails((prevFields) => {
            return {
                ...prevFields,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!submissionDetails.username || !submissionDetails.language || !value) {
            return alert("All fields are required");
        }
        if (!submissionDetails.username.match(/^[a-zA-Z0-9]+$/)) {
            return alert("Invalid username");
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch("http://localhost:3000/submit", options);
        const result = await response.json();

        if (result.error) {
            return alert("Submission failed");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            <h1 className="text-3xl text-center text-gray-800 mb-6 font-bold absolute top-10">Submission Form</h1>
            <Link to="/submissions" className="">Go to submissions</Link>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4 mx-16">
                    <label htmlFor="username" className="text-gray-700 font-semibold">Username</label>
                    <input type="text" id="username" name="username" value={submissionDetails.username} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Enter your username" />
                </div>
                <div className="mb-6 mx-16">
                    <label htmlFor="language" className="text-gray-700 font-semibold">Select language</label>
                    <select id="language" name="language" value={submissionDetails.language} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none">
                        <option value="c++">C++</option>
                        <option value="java">Java</option>
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                    </select>
                </div>
                <CodeMirror value={value} height="200px" onChange={onChange} className="mx-16 border" />
                <div className="flex items-center justify-center mt-4 mx-16">
                    <button type="submit" className="px-6 py-1 w-full border border-black hover:bg-black hover:text-white duration-200 rounded-md focus:outline-none">Submit</button>
                </div>
            </form>
        </div>
    )
}