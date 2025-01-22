import { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../reduxstore/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-sm mx-auto p-5">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
