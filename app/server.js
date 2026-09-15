import { createRequestHandler } from "@remix-run/express";
import express from "express";
import path from "path";

const app = express();

app.use(express.static("public"));

app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    mode: process.env.NODE_ENV,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Velto running on port ${port}`);
});
