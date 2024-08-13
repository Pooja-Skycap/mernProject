import {
  Button,
  Container,
  TextField,
  Typography,
  ChangeEvent,
  FormEvent,
  useState,
} from "../../utils/commonImports";
import axios from "axios";

const LargeFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const createFileSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const CHUNK_SIZE = 1024 * 1024;
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
    <Container maxWidth="sm">
      <form onSubmit={createFileSubmitHandler}>
        <Typography variant="h3" component="div" gutterBottom>
          Upload a File
        </Typography>
        <TextField
          type="file"
          onChange={hangleLargeFileChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
        <Typography variant="h5" component="div" gutterBottom>
          <progress id="file" value={progress} max="100"></progress>
          {progress}%
        </Typography>
      </form>
    </Container>
  );
};

export default LargeFileUpload;
