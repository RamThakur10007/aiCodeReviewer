import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to review code");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://aicodereviewer-server.onrender.com/ai/get-review/",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error reviewing code:", error);
      alert("Failed to review code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 gap-6">
      <header className="w-full text-center py-4 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
        AI Code Reviewer 🤖
      </header>
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Code Editor Section */}
        <div className="w-full lg:w-1/2 h-full bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            onChange={handleFileUpload}
            className="mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg w-full"
          />

          <div className="border border-gray-600 rounded-lg p-2 sm:p-4 bg-gray-900">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{ fontFamily: "Fira Code, monospace", fontSize: 14 }}
            />
          </div>

          <button
            onClick={reviewCode}
            disabled={loading}
            className={`w-full mt-4 py-3 text-base sm:text-lg font-semibold text-white rounded-lg shadow-lg transform transition duration-300 flex justify-center items-center gap-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 hover:scale-105 hover:shadow-xl"
            }`}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Reviewing..." : "Review Code 🤖"}
          </button>
        </div>

        {/* Review Section */}
        <div className="w-full lg:w-1/2 h-full bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <div className="text-gray-300">
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <span className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
                <p className="text-purple-300">Generating review...</p>
              </div>
            ) : (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
