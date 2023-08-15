"use client";

import { useState } from "react";

const Page = () => {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-zinc-800 rounded-xl">
                <form
                    className="flex gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        console.log(prompt);

                        const res = await fetch("/api/generate", {
                            method: "POST",
                            body: JSON.stringify({ prompt }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        const data = await res.json();
                        setImage(data.url);
                        setLoading(false);
                        setPrompt("");
                    }}
                >
                    <input
                        type="text"
                        placeholder="Wirte your prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="border rounded-lg border-gray-500 py-1 my-1 bg-transparent px-3 focus:outline-none flex-1"
                    />
                    <button
                        disabled={loading}
                        className="border rounded-lg border-gray-500 py-1 my-1 bg-transparent px-3 focus:outline-none "
                    >
                        {loading ? "Loading..." : "Generate Image"}
                    </button>
                </form>
                {image && <img src={image} alt="" />}
            </div>
        </div>
    );
};
export default Page;
