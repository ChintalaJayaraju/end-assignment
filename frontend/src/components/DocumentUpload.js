import { useState, useEffect } from "react";
import { uploadDocument, getDocuments } from "../api";

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [docs, setDocs] = useState([]);
  const token = localStorage.getItem("token");

  const loadDocs = async () => {
    if (!token) return;
    try {
      const res = await getDocuments(token);
      setDocs(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    await uploadDocument(file, token);
    alert("File uploaded");
    loadDocs();
  };

  useEffect(() => {
    loadDocs();
  }, []);

  return (
    <div>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button onClick={handleUpload}>Upload</button>
      <ul>
        {docs.map(d => <li key={d._id}>{d.originalname || d.filename}</li>)}
      </ul>
    </div>
  );
}
