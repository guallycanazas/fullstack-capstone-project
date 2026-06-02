import { useState } from 'react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  async function handleLogin(event) {
    event.preventDefault();
    const token = sessionStorage.getItem('token');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    sessionStorage.setItem('token', data.token);
    return data;
  }

  return (
    <form onSubmit={handleLogin}>
      <input value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
      <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
