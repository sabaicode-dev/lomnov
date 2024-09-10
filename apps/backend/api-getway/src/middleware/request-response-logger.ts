// src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import * as xlsx from "xlsx";
import moment from "moment";
import geoip from "geoip-lite"; // Import geoip-lite

// Define the log directory and file path
const logDir = path.join(__dirname, '../logs'); // Point to the logs directory
const logFilePath = path.join(logDir, 'request_logs.xlsx');

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const ip = req.ip || ""; // Ensure ip is a string, default to an empty string
  const method = req.method;
  const endpoint = req.originalUrl;
  const time = moment().format("YYYY-MM-DD HH:mm:ss");

  // Get geolocation data
  const geo = geoip.lookup(ip);
  const location = geo?.city || "Unknown";  // Use optional chaining and default value
  const region = geo?.region || "Unknown";  // Use optional chaining and default value
  const country = geo?.country || "Unknown"; // Use optional chaining and default value

  // Ensure the directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Create the logs directory if it doesn't exist
  }

  let workbook;
  let worksheet;

  if (fs.existsSync(logFilePath)) {
    // If the file exists, read the workbook and get the existing worksheet
    workbook = xlsx.readFile(logFilePath);
    worksheet = workbook.Sheets["Logs"];
  } else {
    // If the file does not exist, create a new workbook and worksheet
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.json_to_sheet([]); // Create an empty sheet
    xlsx.utils.book_append_sheet(workbook, worksheet, "Logs");
  }

  const logData = {
    IP: ip,
    Method: method,
    Endpoint: endpoint,
    Time: time,
    Location: location,
    Region: region,
    Country: country,
  };

  // Read existing data, add new data, and write back
  const existingData = xlsx.utils.sheet_to_json(worksheet);
  existingData.push(logData);
  worksheet = xlsx.utils.json_to_sheet(existingData);

  // Update the worksheet in the workbook
  workbook.Sheets["Logs"] = worksheet;

  // Write the updated workbook to the file
  xlsx.writeFile(workbook, logFilePath);

  next();
};

export default requestLogger;

