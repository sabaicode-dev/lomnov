import { Schema, model, Types } from "mongoose";

// Comment interface for typing
export interface Comment {
  _id: Types.ObjectId;
  propertyId: Types.ObjectId; // Reference to the associated property
  cognitoSub: string;
  profile: string;
  userName: string;
  comment: string;
  datetime: string;
  likes: number;
  likedBy: string[];
}

const CommentSchema = new Schema<Comment>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true }, // Reference to the property
    cognitoSub: { type: String, required: true },
    profile: { type: String },
    userName: { type: String },
    comment: { type: String, required: true },
    datetime: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }],
  },
  { timestamps: true }
);

export const CommentModel = model<Comment>("Comment", CommentSchema);
