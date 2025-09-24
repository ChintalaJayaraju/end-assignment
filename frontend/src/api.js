// ✅ Auto switch between local backend and deployed backend
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://end-assignment.vercel.app/api" // backend on Vercel
    : "http://localhost:5000/api"; // backend local dev

// ================= REGISTER =================
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ================= LOGIN =================
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ================= UPLOAD DOCUMENT =================
export const uploadDocument = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/docs/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  return res.json();
};

// ================= GET DOCUMENTS =================
export const getDocuments = async (token) => {
  const res = await fetch(`${API_URL}/docs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
