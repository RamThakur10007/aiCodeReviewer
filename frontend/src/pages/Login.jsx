import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/review");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/review");
    } catch (err) {
      alert("Login failed. Check your email and password.");
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Login to your account
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label className="w-full sm:w-24 mb-2 sm:mb-0">Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 w-full p-2 bg-gray-700 rounded focus:outline-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label className="w-full sm:w-24 mb-2 sm:mb-0">Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="flex-1 w-full p-2 bg-gray-700 rounded focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
