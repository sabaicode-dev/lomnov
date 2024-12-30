
import mongoose from "mongoose";
import configs from "../config";
class Database {
  private static instance: Database;
  private connectionString: string;

  private constructor() {
    this.connectionString = configs.mongodbUrl as string;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.connectionString);
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
  }
}

export default Database;
