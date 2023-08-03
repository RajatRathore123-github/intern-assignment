import express from "express";
import connection from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routes/tasks.js"

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/tasks", Router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));
connection();