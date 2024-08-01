import { Schema, model, InferSchemaType } from "mongoose";

const eventSchema = new Schema(
  {
    // user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    images: [
      {
        originalname: { type: String },
        path: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

type EventsDocumet = InferSchemaType<typeof eventSchema>;
export default model<EventsDocumet>("Events", eventSchema);
