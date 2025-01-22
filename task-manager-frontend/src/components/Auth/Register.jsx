import { useState } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      message.success(response.data.message);
      navigate('/login');
    } catch (error) {
      message.error('Email already exists');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="shadow-md rounded-lg p-8 max-w-xl w-full">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/reg.gif"
            alt="Register Illustration"
            className="w-1/2 mix-blend-multiply"
          />
        </div>

        {/* Form */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up to get started</p>

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
          onClick={handleRegister}
        >
          Register
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
