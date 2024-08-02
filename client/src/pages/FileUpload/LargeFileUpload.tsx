import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const LargeFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const createFileSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const CHUNK_SIZE = 1024*1024;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    for (let start = 0; start < file.size; start += CHUNK_SIZE) {
      const end = Math.min(start + CHUNK_SIZE, file.size);
      console.log("end", end);
      const chunk = file.slice(start, end);
      console.log("start", start);

      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("chunk", (start / CHUNK_SIZE).toString());
      formData.append("totalChunks", totalChunks.toString());
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      try {
        await axios.post("http://localhost:5400/events/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total)
              setProgress(Math.round((event.loaded * 100) / event.total));
            else console.log("Total size is not available");
          },
        });
        console.log("progress", progress);
      } catch (error) {
        console.log("File Upload Failed", error);
      }
    }
  };
  const hangleLargeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={createFileSubmitHandler}>
      <h1>Upload a File</h1>
      <input type="file" onChange={hangleLargeFileChange} />
      <button type="submit">Send</button>
      <progress id="file" value={progress} max="100"></progress>
      {progress}%
    </form>
  );
};

export default LargeFileUpload;
