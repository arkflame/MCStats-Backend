import { model, Schema } from "mongoose";

const ServerSchema = new Schema(
  {
    protocol: Number,
    raw_software: String,
    software: String,
    versions: [String],
    motd: String,
    online: Boolean,
    players: Number,
    hostname: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model("Server", ServerSchema);
