import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/store/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useRouter } from 'next/router';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null); 
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        router.push('/dashboard'); 
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setLoginError('Usuário não encontrado. Deseja criar uma conta?');
        } else if (err.response && err.response.status === 401) {
          setLoginError('Senha incorreta. Deseja redefinir sua senha?');
        } else {
          setLoginError('Ocorreu um erro ao fazer login.');
        }
      });
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  const handlePasswordReset = () => {
    router.push('/reset-password');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {loginError && (
        <div className="mb-4">
          <p className="text-red-500">{loginError}</p>
          {loginError.includes('Senha incorreta') && (
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-indigo-600 underline"
            >
              Redefinir senha
            </button>
          )}
          {loginError.includes('Usuário não encontrado') && (
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="text-indigo-600 underline"
            >
              Criar conta
            </button>
          )}
        </div>
      )}

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

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <div className="mt-4">
        <p className="text-gray-700">
          Não tem uma conta?{' '}
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="text-indigo-600 underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
