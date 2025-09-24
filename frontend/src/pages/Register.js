import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser({ name, email, password });
    if (data && data.message) {
      if (data.message === 'User registered successfully' || data.message.toLowerCase().includes('registered')) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
