import mongoose from "mongoose";

mongoose.connection.on("connected", () => console.log("DB connected"));
mongoose.connection.on("error", () => console.log("DB Error", error));
const url = process.env.MONGODB_URI;

export async function connect() {
  try {
    await mongoose.connect(url);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
}
