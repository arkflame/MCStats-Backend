import { model, Schema } from "mongoose";

const ServerSchema = new Schema(
  {
    protocol: Number,
    raw_software: String,
    software: String,
    versions: [String],
    motd: String,
    hostname: {
      type: String,
      unique: true,
    },
    port: {
      type: Number,
      default: 25565,
    },
  },
  { timestamps: true }
);

export default model("Server", ServerSchema);
