import express from "express";
import joyasRoute from "./routes/joyas.route.js";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use("/joyas", joyasRoute)

app.listen(process.env.PORT, console.log(`Listening on http://localhost:${process.env.PORT}`))