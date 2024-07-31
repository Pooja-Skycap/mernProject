import { RequestHandler } from "express";
import Events from "../models/eventsModel";

export const getEvents: RequestHandler = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 5;
    const sortOrder = req.query.sort as "asc" | "desc";
    const fieldname = req.query.fieldname as string;
    const sort: { [key: string]: "asc" | "desc" } = { [fieldname]: sortOrder };

    if (offset < 0 || limit <= 0) {
      return res.status(400).json({ error: "Invalid offset or limit value" });
    }
    const query = Events.find()
      .skip(offset * limit)
      .limit(limit);

    if (fieldname && (sortOrder === "asc" || sortOrder === "desc")) {
      query.sort(sort);
    }
    const events = await query.exec();
    const totalCount = await Events.countDocuments().exec();

    return res.status(200).json({
      offset,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      events,
    });
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};

// export const getSortedEvents: RequestHandler = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit as string) || 5;
//     const sort = (req.query.sort as string) || "asc";

//     console.log("sort", sort);
//     if (limit <= 0) {
//       return res.status(400).json({ error: "Invalid offset or limit value" });
//     }
//     const events = await Events.find().sort({ title: -1 });

//     return res.status(200).json({
//       events,
//     });
//   } catch (error) {
//     let errorMessage = "An unknown error has occured";
//     if (error instanceof Error) errorMessage = error.message;
//     res.status(500).json({ error: errorMessage });
//   }
// };

export const createEvents: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  console.log("req.body", req.body);
  console.log("req.files", req.files);

  try {
    const files = req.files as Express.Multer.File[];
    const images = files?.map((eachfile) => ({
      originalname: eachfile.originalname,
      path: eachfile.path,
    }));
    const newEvent = await Events.create({
      title,
      description,
      images,
    });
    return res.status(201).json({ newEvent });
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};
