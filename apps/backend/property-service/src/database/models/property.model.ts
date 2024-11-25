// ===============This is old code =====================
// import { Schema, model } from "mongoose";
// import { Property, LocalizedContent } from "@/src/utils/types/indext";

// // ==================================================================
// // Define the PropertyDocument interface that includes timestamps
// interface PropertyDocument {
//   createdAt: Date;
//   updatedAt: Date;
// }
// const LocalizedContentSchema = new Schema<LocalizedContent>({
//   content: { type: String },
//   language: { type: String },
// });

// const DetailSchema = new Schema({
//   language: { type: String, required: true },
//   content: { type: Map, of: String, required: true }, // Flexible key-value pairs
// });

// const PropertySchema = new Schema<Property>(
//   {
//     cognitoSub: { type: String, required: true},
//     title: { type: [LocalizedContentSchema], required: true },
//     description: { type: [LocalizedContentSchema], required: true },
//     thumbnail: { type: String, required: true },
//     images: { type: [String], required: true },
//     urlmap: { type: String },
//     address: { type: [LocalizedContentSchema], required: true },
//     location: { type: [LocalizedContentSchema], required: true },
//     price: { type: Number },
//     category: { type: [LocalizedContentSchema], required: true },
//     transition: { type: [LocalizedContentSchema], required: true },
//     detail: { type: [DetailSchema], required: true }, // Array of detail objects with flexible content
//     status: { type: Boolean, default: true },
//   },
//   { timestamps: true },
// );

// // Add a pre-save middleware to adjust timestamps
// PropertySchema.pre<PropertyDocument>("save", function (next) {
//   const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
//   // Adjust createdAt and updatedAt fields
//   this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
//   this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
//   next();
// });

// export const PropertyModel = model<Property>("Property", PropertySchema);


//=================This is new code ===============================

import { Schema, model } from "mongoose";
import { Property, LocalizedContent } from "@/src/utils/types/indext";

// ==================================================================
// Define the PropertyDocument interface that includes timestamps
interface PropertyDocument {
  createdAt: Date;
  updatedAt: Date;
}

// Extend Property to include views
interface PropertyWithViews extends Property {
  views: number; // Tracks the total number of views
}

const LocalizedContentSchema = new Schema<LocalizedContent>({
  content: { type: String },
  language: { type: String },
});

const DetailSchema = new Schema({
  language: { type: String, required: true },
  content: { type: Map, of: String, required: true }, // Flexible key-value pairs
});


const PropertySchema = new Schema<PropertyWithViews>(
  {
    cognitoSub: { type: String || undefined , required: true },
    title: { type: [LocalizedContentSchema], required: true },
    description: { type: [LocalizedContentSchema], required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    urlmap: { type: String },
    address: { type: [LocalizedContentSchema], required: true },
    location: { type: [LocalizedContentSchema], required: true },
    price: { type: Number },
    category: { type: [LocalizedContentSchema], required: true },
    transition: { type: [LocalizedContentSchema], required: true },
    detail: { type: [DetailSchema], required: true }, // Array of detail objects with flexible content
    status: { type: Boolean, default: true },
    
    views: { type: Number, default: 0 }, // Initialize views to 0
  },
  { timestamps: true }
);

// Add a pre-save middleware to adjust timestamps
PropertySchema.pre<PropertyDocument>("save", function (next) {
  const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  // Adjust createdAt and updatedAt fields
  this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
  this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
  next();
});

// Static method to increment views
PropertySchema.statics.incrementViews = async function (propertyId: string) {
  return this.findByIdAndUpdate(
    propertyId,
    { $inc: { views: 1 } },
    { new: true } // Return the updated document
  );
};

// Export the updated Property model
export const PropertyModel = model<PropertyWithViews>("Property", PropertySchema);
