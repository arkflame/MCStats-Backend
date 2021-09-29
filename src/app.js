import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/router";

const app = express();

app.use(
  cors({
    origin: "https://mcstats.live",
  })
);
app.use(morgan("dev"));
app.use(router);

export default app;
