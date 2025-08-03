import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const BACKEND_URL = 'https://scholardorm-backend.gentlemeadow-49027184.eastus.azurecontainerapps.io';

function App() {
  const [user, setUser] = useState({ email: '', name: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Success: User ${data.user.name} registered successfully!`);
        setUser({ email: '', name: '', password: '' });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testBackend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      const data = await response.json();
      setMessage(`Backend Status: ${data.status} - ${data.service}`);
    } catch (error) {
      setMessage(`Backend Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Scholar-Dorm Application</h1>
        
        <div style={{ margin: '20px', textAlign: 'left', maxWidth: '400px' }}>
          <button onClick={testBackend} disabled={isLoading}>
            Test Backend Connection
          </button>
          
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Register New User</h3>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Register User'}
            </button>
          </form>

          {message && (
            <div style={{ 
              marginTop: '20px', 
              padding: '10px', 
              backgroundColor: message.includes('Success') ? '#4CAF50' : '#f44336',
              color: 'white',
              borderRadius: '4px'
            }}>
              {message}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
