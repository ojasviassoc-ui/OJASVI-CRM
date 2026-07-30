import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use(errorHandler);

export default app;