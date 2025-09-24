import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Welcome to End-Assignement</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}
