import { useState } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-sm mx-auto p-5">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
