import { Schema, model } from "mongoose";
import { Property, LocalizedContent } from "@/src/utils/types/indext";

// ==================================================================

// Define the PropertyDocument interface that includes timestamps
interface PropertyDocument {
  createdAt: Date;
  updatedAt: Date;
}


const LocalizedContentSchema = new Schema<LocalizedContent>({
  content: { type: String },
  language: { type: String },
});

const PropertySchema = new Schema<Property>(
  {
    title: [LocalizedContentSchema],
    description: [LocalizedContentSchema],
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    urlmap: { type: String },
    address: [LocalizedContentSchema],
    price: { type: Number },
    detail: { type: Schema.Types.Mixed }, // Flexible key-value pairs
    status: { type: Boolean, default: true },
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

export const PropertyModel = model<Property>("Property", PropertySchema);
