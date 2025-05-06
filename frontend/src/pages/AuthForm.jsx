import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstace';
import { setuserlogin } from '../app/slice/UserSlice';
import { useDispatch } from 'react-redux';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch()
  const formData = {
    name : '',
    email:'',
    password:''
  }
  
  const toggleForm = () => setIsLogin(!isLogin);
  
  const handleChange = (e)=>{
    formData[e.target.name] = e.target.value
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const endpoint = isLogin ? '/user/login' : '/user/signup';

      const response = await axiosInstance.post(endpoint, formData).then((res) => {
        dispatch(setuserlogin(res.data.token))
        console.log(`${res.data.msg}`)
        alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
      }).catch((err) => {
        console.log(`${err}`);
        alert(err.response.data.msg);

      })
    } catch (error) {
      alert(
        error.response?.data?.message ||
        `Failed to ${isLogin ? 'login' : 'signup'}.`
      );
    }
  };


  return (
    <div className="h-[calc(100vh-65px)] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name='name'
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
