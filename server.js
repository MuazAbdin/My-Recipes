import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path from "path";
import morgan from "morgan";
import router from "./router.js";

app.use("/static", path.join(__dirname, "node_modules"));
app.use("/static", path.join(__dirname, "dist"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
