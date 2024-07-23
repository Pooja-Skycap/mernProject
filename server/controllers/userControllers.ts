import {RequestHandler} from 'express'
import User from "../models/userModel";

export const userLogin: RequestHandler = async (req, res) => {
  try {
    const data = User.find();
    res.status(200).json(data);
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};
