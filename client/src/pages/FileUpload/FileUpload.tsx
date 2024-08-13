import { ChangeEvent, FormEvent, useState } from "../../utils/commonImports";
import "./FileUpload.css";
import axios from "axios";
const FileUpload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<(string | ArrayBuffer)[]>(
    []
  );
  const createProductImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages([]);
      setImagesPreview([]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            const result = reader.result;
            if (result) {
              setImagesPreview((old) => [...old, result]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
      setImages(files);
    }
  };

  const createProductSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", "Title");
    myForm.append("description", "Descr");
    images.forEach((image) => {
      myForm.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:5400/events/create",
        myForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("herE", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <form onSubmit={createProductSubmitHandler}>
        <h1>File Upload</h1>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={createProductImagesChange}
          multiple
        />
        <div id="createProductFormImage">
          {imagesPreview.map((image, index) => (
            <img
              className="product-image"
              key={index}
              src={image as string}
              alt="Product Preview"
            />
          ))}
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default FileUpload;
