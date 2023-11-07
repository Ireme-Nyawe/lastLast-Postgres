import { Sequelize } from "sequelize";
import app from "./app.js";

const db= new Sequelize(process.env.DbC);
const testConnection = async () => {
    try {
        await db.authenticate();
        console.log("Good Job, Connected To Databse...");
    } catch (error) {
        console.error("Unable", error);
    }
};
testConnection();
app.get("/",(req,res) => {res.send("index")});
const PORT = process.env.PORT || 5001
app.listen(PORT,console.log(`Server is running on  http://localhost:${PORT}`));
