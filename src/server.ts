import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import recipesRouter from "../src/routes/recipesRouter.js";

const PORT = process.env.EXPRESS_PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", recipesRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is listening on ${PORT}`);
});
