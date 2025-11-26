//------------------ required modules -------------------------

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoDB from "./config/dbConfig";

import authRouter from "./routes/authRoute";
import urlRouter from "./routes/urlRoute";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();


//-------------------------- Cors -------------------------------

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);


//--------------------------- middlewares -----------------------

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//----------------------- Confiq Mongodb -----------------------

mongoDB();


//---------------------------- routes --------------------------

app.use("/api/auth", authRouter);
app.use("/api/url", urlRouter);
app.get("/:shortId", urlRouter);


//----------------------- Server listening -----------------------

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});