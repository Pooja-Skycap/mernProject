import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { jsPDF } from "jspdf";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./CreateEvent.css";
import { ResponseData } from "../../../Interfaces/usersInterface";
import { zodSchema } from "../../../formvalidation/zod";
import { z } from "zod";

type FormData = z.infer<typeof zodSchema>;

const CreateEvent = () => {
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    mode: "onChange", // Validate on every change
  });

  // const onhandleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  //   validate(e.target.value);
  // };
  // const handleBlur = () => {
  //   setTouched(true);
  //   validate(title);
  // };

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

  // const validate = (value: string) => {
  //   try {
  //     zodSchema.parse({ title: value });
  //     setErrors({});
  //   } catch (e) {
  //     if (e instanceof z.ZodError) {
  //       const errorMessages = e.errors.reduce(
  //         (acc: { [key: string]: string }, { path, message }) => {
  //           acc[path[0]] = message;
  //           return acc;
  //         },
  //         {}
  //       );
  //       setErrors(errorMessages);
  //     }
  //   }
  // };

  const createProductSubmitHandler = async (data: FormData) => {
    const myForm = new FormData();
    myForm.append("title", data.title);
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
    doc.setFontSize(50);
    doc.setFont("helvetica", "bold");
    // const titleWidth = doc.getTextWidth(response.title);
    // const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(response.title, 10, 20);

    if (response.description) {
      doc.setFontSize(20);
      doc.setFont("helvetica", "normal");
      doc.text(response.description, margin + 10, 40, {
        maxWidth: doc.internal.pageSize.width - 2 * margin,
      });
    }

    const imagesToPDF: Promise<void>[] = (response.images || [])?.map(
      (image) => {
        return new Promise<void>((resolve, reject) => {
          console.log("image", image);
          const img = new Image();
          img.src = `http://localhost:5400/${image.path}`;
          console.log("img.src", img.src);
          img.onload = () => {
            doc.addImage(img, "JPEG", 10, 50, 180, 160);
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
      <form onSubmit={handleSubmit(createProductSubmitHandler)}>
        <FormControl fullWidth margin="normal" error={!!errors.title}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("title");
                }}
                onBlur={field.onBlur}
                helperText={
                  isSubmitted && errors.title ? errors.title.message : ""
                }
                error={!!errors.title}
              />
            )}
          />

          {/* <TextField
          value={title}
          onChange={onhandleChange}
          onBlur={handleBlur}
          id="outline-basic"
          label="Title"
          variant="outlined"
          fullWidth
          helperText={errors.title}
          error={!!errors.title}
          sx={{ paddingBottom: "14px" }}
        /> */}
        </FormControl>

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
