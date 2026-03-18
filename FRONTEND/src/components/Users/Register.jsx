import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../../redux/slices/users/usersSlices.js";
import ErrorMsg from "../../components/Alert/ErrorMsg";
import SuccessMsg from "../../components/Alert/SuccessMsg";
import LoadingComponent from "../../components/Alert/LoadingComponent";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
    };
    dispatch(registerAction(payload));
  };

  const { user, error, loading, success } = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.status === "success") {
      navigate("/login");
    }
  }, [user?.status, navigate]);

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-full max-w-md mx-auto">
      <div className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-2xl">
        {/* <img
          className="relative -top-2 -mt-16 mb-6 h-16"
          src="flex-ui-assets/logos/flex-circle-green.svg"
          alt="Logo"
        /> */}
        <h2 className="mb-4 text-2xl md:text-3xl font-bold text-coolGray-900 text-center">
          Join our community
        </h2>

        {error && <ErrorMsg message={error.message} />}
        {success && <SuccessMsg message="Registration Successful!" />}

        <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing.
        </h3>

        <label className="mb-4 w-full">
          <span className="mb-1 block text-coolGray-800 font-medium">Name</span>
          <input
            className="py-3 px-3 w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </label>
        <label className="mb-4 w-full">
          <span className="mb-1 block text-coolGray-800 font-medium">Username</span>
          <input
            className="py-3 px-3 w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </label>
        <label className="mb-4 w-full">
          <span className="mb-1 block text-coolGray-800 font-medium">Email</span>
          <input
            className="py-3 px-3 w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
        </label>
        <label className="mb-6 w-full">
          <span className="mb-1 block text-coolGray-800 font-medium">Password</span>
          <input
            className="py-3 px-3 w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </label>

        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            type="submit"
            className="mb-4 w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Get Started
          </button>
        )}

        <p className="text-sm text-gray-500 font-medium text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:text-green-600">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;