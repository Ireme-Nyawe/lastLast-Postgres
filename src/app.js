import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routeUser from "./routes/userRoute";
import routePost from "./routes/postRoutes";
import routeComment from "./routes/commentRoute";
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'Postgres Posts APIs Documentation',
            version : '1.0.0'
        },
        
        servers :[{
            url: 'https://blogpgs.onrender.com/',
        }],
        security: [
            {
              BearerAuth: [],
            },
          ],
          components: {
            securitySchemes: {
              BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
        }
    },
    apis : ['src/documenting/*.js'], //  Determining documentation file
}
const swaggerSpec = swaggerJSDoc(options)

// testing app
app.get("/",(req,res) =>{
    return res.status(200).json({
        status:"200",
        author:"AKIMANA",
        message:"Hello, My Postgres API is on Set",
    });
    });

// end points
app.use("/documentation",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/pgs/user",routeUser);
app.use("/pgs/post",routePost);
app.use("/pgs/comment",routeComment);

export default app; 





