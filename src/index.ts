import express, { Express, json } from "express";
import dotenv from "dotenv";
import path from "path";
import rootRouter from "./routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 4000;
app.use(json());
app.use("/api/v1", rootRouter);
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use(cors());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
