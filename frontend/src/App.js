import React, { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const API = `${BACKEND_URL}/api`;

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 ${
        isDark
          ? "bg-white/10 hover:bg-white/20 text-white"
          : "bg-black/10 hover:bg-black/20 text-gray-800"
      }`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        // Light mode icon (sun)
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Dark mode icon (moon)
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

// Login Page Component
const LoginPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login - just navigate to dashboard
    navigate("/dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Dummy signup - just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div
        className={`max-w-md w-full space-y-8 rounded-xl p-8 shadow-2xl border ${
          isDark
            ? "bg-white/10 backdrop-blur-md border-white/20"
            : "bg-white/90 backdrop-blur-md border-gray-200"
        }`}
      >
        <div className="text-center">
          <h2
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Intern Portal
          </h2>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Welcome back! Please sign in to your account
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              onClick={handleLogin}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-blue-900 transition duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleSignup}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg hover:from-slate-700 hover:to-slate-800 transition duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dashboard Page Component
const Dashboard = () => {
  const { isDark } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API}/user`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
      >
        <div
          className={`min-h-screen flex items-center justify-center ${
            isDark
              ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
              : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          }`}
        >
          <div className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const rewards = [
    {
      threshold: 5000,
      name: "Bronze Badge",
      unlocked: userData?.donations >= 5000,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      color: "text-orange-600",
    },
    {
      threshold: 10000,
      name: "Silver Badge",
      unlocked: userData?.donations >= 10000,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      color: "text-gray-500",
    },
    {
      threshold: 15000,
      name: "Gold Badge",
      unlocked: userData?.donations >= 15000,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      color: "text-yellow-500",
    },
    {
      threshold: 20000,
      name: "Platinum Badge",
      unlocked: userData?.donations >= 20000,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z" />
        </svg>
      ),
      color: "text-slate-400",
    },
    {
      threshold: 50000,
      name: "Diamond Badge",
      unlocked: userData?.donations >= 50000,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6,2L2,8L12,22L22,8L18,2H6Z" />
        </svg>
      ),
      color: "text-cyan-400",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`backdrop-blur-md border-b ${
          isDark ? "bg-black/20 border-white/10" : "bg-white/20 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Intern Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDark
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/leaderboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDark
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
              >
                Leaderboard
              </Link>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDark
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
              >
                Logout
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome back, {userData?.name}! 👋
          </h2>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Here's your current progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`backdrop-blur-md rounded-xl p-6 border ${
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white/90 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Your Name
                </p>
                <p
                  className={`text-3xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {userData?.name}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  isDark ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-md rounded-xl p-6 border ${
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white/90 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Referral Code
                </p>
                <p className="text-3xl font-bold text-blue-400">
                  {userData?.referral}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  isDark ? "bg-purple-500/20" : "bg-purple-100"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-md rounded-xl p-6 border ${
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white/90 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Total Donations
                </p>
                <p className="text-3xl font-bold text-emerald-500">
                  ${userData?.donations?.toLocaleString()}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div
          className={`backdrop-blur-md rounded-xl p-6 border mb-8 ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-white/90 border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            🏆 Rewards & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  reward.unlocked
                    ? isDark
                      ? "bg-green-500/20 border-green-400/50 text-green-300"
                      : "bg-green-100 border-green-300 text-green-700"
                    : isDark
                    ? "bg-gray-500/20 border-gray-400/50 text-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`flex justify-center mb-3 ${
                      reward.unlocked ? reward.color : "text-gray-400"
                    }`}
                  >
                    {reward.icon}
                  </div>
                  <p className="font-semibold text-sm">{reward.name}</p>
                  <p className="text-xs mt-1">
                    ${reward.threshold.toLocaleString()}
                  </p>
                  {reward.unlocked ? (
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                      Unlocked!
                    </span>
                  ) : (
                    <span
                      className={`inline-block text-white text-xs px-2 py-1 rounded-full mt-2 ${
                        isDark ? "bg-gray-500" : "bg-gray-400"
                      }`}
                    >
                      Locked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`backdrop-blur-md rounded-xl p-6 border ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-white/90 border-gray-200"
          }`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            📈 Progress to Next Reward
          </h3>
          <div className="space-y-3">
            {rewards.map((reward, index) => {
              if (reward.unlocked) return null;
              const progress = Math.min(
                (userData?.donations / reward.threshold) * 100,
                100
              );
              const remaining = reward.threshold - userData?.donations;

              return (
                <div key={index}>
                  <div
                    className={`flex justify-between text-sm mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span>{reward.name}</span>
                    <span>${remaining.toLocaleString()} remaining</span>
                  </div>
                  <div
                    className={`w-full rounded-full h-2 ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-blue-600 to-slate-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Leaderboard Page Component
const Leaderboard = () => {
  const { isDark } = useTheme();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API}/leaderboard`);
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
      >
        <div
          className={`min-h-screen flex items-center justify-center ${
            isDark
              ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
              : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          }`}
        >
          <div className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "🏆";
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`backdrop-blur-md border-b ${
          isDark ? "bg-black/20 border-white/10" : "bg-white/20 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Intern Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDark
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/leaderboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDark
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
              >
                Leaderboard
              </Link>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDark
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-700"
                }`}
              >
                Logout
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            🏆 Leaderboard
          </h2>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Top performers by donations raised
          </p>
        </div>

        <div
          className={`backdrop-blur-md rounded-xl border overflow-hidden ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-white/90 border-gray-200"
          }`}
        >
          <div className="p-6">
            <div className="space-y-4">
              {leaderboardData.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                    entry.name === "Nachiketh"
                      ? isDark
                        ? "bg-blue-500/20 border border-blue-400/50"
                        : "bg-blue-100/80 border border-blue-300"
                      : isDark
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/50 hover:bg-white/80 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          : index === 1
                          ? "bg-gradient-to-r from-gray-300 to-gray-500"
                          : index === 2
                          ? "bg-gradient-to-r from-orange-400 to-orange-600"
                          : "bg-gradient-to-r from-blue-600 to-slate-600"
                      }`}
                    >
                      {index < 3 ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {entry.name}
                        {entry.name === "Nachiketh" && (
                          <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </h3>
                      <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                        Rank #{index + 1}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-500">
                      ${entry.donations.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Total Raised
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
