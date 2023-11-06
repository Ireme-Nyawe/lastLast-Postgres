import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import routeUser from "./routes/userRoute";
import routePost from "./routes/postRoutes";
import routeComment from "./routes/commentRoute";
const app = express();

dotenv.config();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get("/",(req,res) =>{
    return res.status(200).json({
        status:"200",
        author:"AKIMANA",
        message:"Hello, My Postgres API is on Set",
    });
    });

// use created Routes
app.use("/pgs/user",routeUser);
app.use("/pgs/post",routePost);
app.use("/pgs/comment",routeComment);

export default app; 





