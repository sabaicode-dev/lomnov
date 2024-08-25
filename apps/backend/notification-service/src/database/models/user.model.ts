import { User } from "@/src/utils/types/indext";
import { Schema, model } from "mongoose";
// ==================================================================
// Define the PropertyDocument interface that includes timestamps

interface UserDocument {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    cognitoSub: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    userName: {type:String, unique: true},
    phoneNumber: { type: String },
    address: { type: String },
    age: { type: Number },
    gender: { type: String },
    dateOfBirth: { type: String },
    profile: { type: Array },
    background: { type: Array },
    favorite: { type: Array },
  },
  { timestamps: true },
);

// Add a pre-save middleware to adjust timestamps
UserSchema.pre<UserDocument>("save", function (next) {
  const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  // Adjust createdAt and updatedAt fields
  this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
  this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
  next();
});

export const UserModel = model<User>("user", UserSchema);