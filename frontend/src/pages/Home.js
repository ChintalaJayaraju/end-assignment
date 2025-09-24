import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "../components/DocumentUpload";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  return (
    <div>
      <h2>Upload Your Photos</h2>
      <DocumentUpload />
    </div>
  );
}
