import express from "express";
import router from "./config/router.js";
import { connectDb } from "./db/helpers.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// middleware
// in between the request and our routing code (below),
// this middleware is decoding JSON
app.use(express.json());
// using the router for /api/... requests
app.use("/api", router);

async function startServer() {
  try {
    await connectDb();
    console.log("🤖 Mongoose is connected");
    app.listen(process.env.PORT, () =>
      console.log(`🤖 Listening on Port: ${process.env.PORT}`)
    );
  } catch (err) {
    console.log("🤖 Oh no something went wrong", err);
  }
}

startServer();

//update

//ollys updated comments
