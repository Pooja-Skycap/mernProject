import express from 'express'
import { createEvents, getEvents } from '../controllers/eventControllers';

const route = express.Router();
route.post("/create", createEvents)
route.get("/get", getEvents)



export default route