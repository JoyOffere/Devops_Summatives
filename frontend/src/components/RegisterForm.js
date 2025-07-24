import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Replace with your backend API call
      await new Promise(res => setTimeout(res, 1000));
      setMessage('Registration successful!');
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setMessage('Registration failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-gray-100 to-gray-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Create Account</h2>
        {message && (
          <div className={`mb-4 text-center font-semibold ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-purple-600 text-white p-3 rounded font-bold transition ${loading ? 'opacity-50' : 'hover:bg-purple-700'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;