import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/store/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useRouter } from 'next/router';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'manager' | 'employee'>('employee'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ username, email, password, role })) 
      .unwrap()
      .then(() => {
        router.push('/login');
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as 'manager' | 'employee')} // Garantindo os valores corretos
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
