import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { jsPDF } from "jspdf";

import "./CreateEvent.css";
import { ResponseData } from "../../../Interfaces/usersInterface";

const CreateEvent = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [responseData, setResponseData] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseData>({
    title: "",
    description: "",
    images: [],
  });

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
    myForm.append("title", title);
    myForm.append("description", description);
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
      console.log("response.data", response.data);
      const newEvent = response.data;
      if (newEvent) {
        setResponseData(true);
        setResponse(newEvent);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const generatePDFhandler = () => {
    if (!responseData) return;
    const doc = new jsPDF();

    const margin = 10;
    const lineHeight = 10;
    let currentY = margin;

    doc.setFontSize(50);
    doc.setFont("helvetica", "bold");
    const titleWidth = doc.getTextWidth(response.title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(response.title, titleX, currentY);
    currentY += lineHeight * 2;

    if (response.description) {
      doc.setFontSize(20);
      doc.setFont("helvetica", "normal");
      doc.text(response.description, margin + 10, currentY + 40, {
        maxWidth: doc.internal.pageSize.width - 2 * margin,
      });
      currentY += lineHeight * 2;
    }

    const imagesToPDF: Promise<void>[] = (response.images || [])?.map(
      (image) => {
        return new Promise<void>((resolve, reject) => {
          console.log("image", image);
          const img = new Image();
          img.src = `http://localhost:5400/${image.path}`;
          console.log("img.src", img.src);
          img.onload = () => {
            doc.addImage(img, "JPEG", 10, 20, 180, 160);
            resolve();
          };
          img.onerror = reject;
        });
      }
    );
    Promise.all(imagesToPDF).then(() => {
      doc.save("response-data.pdf");
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Create Events
      </Typography>
      <form onSubmit={createProductSubmitHandler}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="outline-basic"
          label="Title"
          variant="outlined"
          fullWidth
          sx={{ paddingBottom: "14px" }}
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          id="outline-basic"
          label="Description"
          variant="outlined"
          fullWidth
        />
        <TextField
          type="file"
          inputProps={{ multiple: true }}
          onChange={createProductImagesChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        {/* <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={createProductImagesChange}
          multiple
        /> */}
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

        <Button type="submit" variant="contained">
          Send
        </Button>

        {responseData && (
          <Button
            onClick={generatePDFhandler}
            variant="contained"
            color="secondary"
            style={{ marginLeft: "20px" }}
          >
            Generate PDF
          </Button>
        )}
      </form>
    </Container>
  );
};

export default CreateEvent;
