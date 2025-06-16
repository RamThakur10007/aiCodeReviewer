import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      // const token = res.data.token;

      // login(token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Signup failed. Please try again later."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all"
        >
          Create Account
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
