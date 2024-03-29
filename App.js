import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import siteRouter from "./routes/siteRouter.js";
import droneRouter from "./routes/droneRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import missionRouter from "./routes/missionRouter.js";
import cookieParser from "cookie-parser";

import { auth, isLoggedIn } from "./middlewares/auth.js";
import { errorHandler } from "./helpers/errorHandler.js";


const app = express();

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(cookieParser());
app.use(auth);

app.use('/user', userRouter);
app.use('/site', isLoggedIn, siteRouter);
app.use('/drone', isLoggedIn, droneRouter);
app.use('/category', isLoggedIn, categoryRouter);
app.use('/mission', isLoggedIn, missionRouter);

app.use((err, req, res, next) => errorHandler(err, req, res, next));   

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`)))
	.catch((error) => console.log(error.message));
