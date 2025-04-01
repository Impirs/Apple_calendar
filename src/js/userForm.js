import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5023/api/users', { name, password });
        if (response.status === 201) {
            setMessage('User created successfully!');
            setName('');
            setPassword('');
        }
    } catch (error) {
        setMessage('Error creating user!');
        console.error(error);
    }
};


  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserForm;
