import { Schema, model, InferSchemaType } from "mongoose";

const eventSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
},{
    timestamps: true
});

type Events = InferSchemaType<typeof eventSchema>;
export default model<Events>("Events", eventSchema);
