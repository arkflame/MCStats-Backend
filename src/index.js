import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env["MONGODB_URI"]).then(() => {
  console.log("Database connected");
});

app.listen(process.env["PORT"], () => {
  console.log(
    "Application listening on http://127.0.0.1:" + process.env["PORT"] + "/"
  );
});
