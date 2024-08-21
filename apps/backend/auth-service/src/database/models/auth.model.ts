import { Schema, model } from "mongoose";
import { Auth } from "@/src/utils/types/indext";
// ==================================================================

// Define the PropertyDocument interface that includes timestamps
interface PropertyDocument {
  createdAt: Date;
  updatedAt: Date;
}

const AuthSchema = new Schema<Auth>(
  {
    cognitoSub: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true },
    isVerified: { type: Boolean, default:false },
    role: { type: String },
  },
  { timestamps: true },
);

// Add a pre-save middleware to adjust timestamps
AuthSchema.pre<PropertyDocument>("save", function (next) {
  const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  // Adjust createdAt and updatedAt fields
  this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
  this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
  next();
});

export const AuthModel = model<Auth>("Auth", AuthSchema);
