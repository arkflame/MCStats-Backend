import express from "express";
import morgan from "morgan";
import path from "path";

import router from "./routes/router";

const app = express();

app.use(morgan("dev"));
app.use(router);

export default app;
