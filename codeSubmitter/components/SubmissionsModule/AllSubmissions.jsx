import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllSubmissionsTable() {
    const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" })

    const [submissions, setSubmissions] = useState([]);
    const [showCode, setShowCode] = useState({});

    useEffect(() => {
        const fetchSubmissions = async () => {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const response = await fetch("https://tuf-interview.vercel.app/api/submissions", options);
            const result = await response.json();

            if (result.error) {
                return alert("Error fetching submissions");
            } else {
                setSubmissions(result.submissions);
                setShowCode(result.submissions.map((index) => {
                    return {
                        [index]: {
                            show: false,
                        }
                    }
                }));
            }
        }
        fetchSubmissions();
    }, [])

    const handleShow = id => {
        setShowCode(prevFields => {
            return {
                ...prevFields,
                [id]: {
                    show: !prevFields[id].show
                }
            }
        })
    }

    return (
        <div className="w-full flex flex-col min-h-screen items-center relative">
            <Link to="/" className="font-semibold underline absolute top-14 right-16">Go to home</Link>
            <h1 className="text-4xl font-bold mt-10">All Submissions</h1>
            <div className="relative overflow-x-auto w-full flex mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mx-16 border rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Language
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Timestamp
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Std in
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submissions?.map((submission, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {submission.username}
                                        </th>
                                        <td className="px-6 py-4">
                                            {submission.language}
                                        </td>
                                        <td className="px-6 py-4">
                                            {dateFormatter.format(new Date(submission.timestamp))}
                                        </td>
                                        <td className="px-6 py-4">
                                            {submission.stdin}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                submission.code.length > 100 ? (
                                                    <>
                                                        <div className={`${showCode[index]?.show || "overflow-hidden h-5"}`}>
                                                            {submission.code}
                                                        </div>
                                                        <button className="underline hover:cursor-pointer text-blue-500" onClick={() => handleShow(index)}>{showCode[index]?.show ? "Hide" : "Show more"}</button>
                                                    </>
                                                ) : submission.code
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}