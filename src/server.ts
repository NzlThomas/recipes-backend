import express from "express";
import recipesRouter from "../src/routes/recipesRouter.js";

const PORT = process.env.EXPRESS_PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", recipesRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is listening on ${PORT}`);
});
