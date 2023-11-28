import express from "express";
import { json } from "express";

const app = express();

app.use(json());

export default app;
