import { Request, Response, NextFunction } from "express";
import { AppError } from "@/src/utils/error/customErrors";
import { StatusCodes } from "@/src/utils/constands/satusCodes";
import { MongoServerError } from "mongodb";

// Define a custom type that extends MongoServerError with keyValue
interface MongoServerErrorWithKeyValue extends MongoServerError {
  keyValue?: Record<string, any>;
}

// ========================================

export function errorHandler(
  err: AppError | Error | MongoServerErrorWithKeyValue,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  let status: number;
  let message: string;

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof MongoServerError && err.code === 11000) {
    // Handle MongoDB duplicate key error
    status = StatusCodes.BAD_REQUEST;

    const duplicateField = err.keyValue
      ? Object.keys(err.keyValue)[0]
      : "unknown";
    message = `Duplicate value for field: ${duplicateField}`;
  } else {
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    message = err.message || "Internal Server Error";
  }

  res.status(status).json({ status, message });
}
