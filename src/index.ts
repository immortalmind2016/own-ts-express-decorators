import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/LoginController";
import "./controllers/rootController";

import { AppRouter } from "./AppRouter";
const app = express();
const router = AppRouter.getInstance();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({ keys: ["key"] }));
app.use(router);

app.listen(4000);
