
import { Schema, model } from "mongoose";
// import { Property, LocalizedContent } from "";

// ==================================================================

// Define the PropertyDocument interface that includes timestamps
interface PropertyDocument {
  createdAt: Date;
  updatedAt: Date;
}



const PropertySchema = new Schema(
  {
    conitoSub: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    googeId: {type: String, required: true, unique: true},
    isVerified: {type: Boolean},
    role: {type:String}

  },
  { timestamps: true },
);

// Add a pre-save middleware to adjust timestamps
PropertySchema.pre<PropertyDocument>("save", function (next) {
  const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  // Adjust createdAt and updatedAt fields
  this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
  this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
  next();
});

export const PropertyModel = model("Property", PropertySchema);
