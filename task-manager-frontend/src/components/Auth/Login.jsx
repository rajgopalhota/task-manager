import { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../reduxstore/authSlice';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;
      dispatch(login({ token }));
      message.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      message.error('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="shadow-md rounded-lg p-8 max-w-xl w-full">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/login.gif"
            alt="Login Illustration"
            className="w-1/2"
          />
        </div>

        {/* Form */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to continue to your account</p>

        <Input
          prefix={<MailOutlined className="text-gray-400" />}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button
          type="primary"
          className="w-full mb-4"
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
