import { RequestHandler } from "express";
import Events from "../models/eventsModel";

export const getEvents: RequestHandler = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 5;

    if (offset < 0 || limit <= 0) {
      return res.status(400).json({ error: "Invalid offset or limit value" });
    }
    const events = await Events.find()
      .skip(offset * limit)
      .limit(limit)
      .exec();

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

export const createEvents: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newEvent = await Events.create({
      title,
      description,
    });
    return res.status(201).json({ newEvent });
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};
