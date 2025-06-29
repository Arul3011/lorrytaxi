const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/userroute");
app.get("/",(req,res)=>{
    res.send("helo world");
})
app.use("/api/user",userRoute);
app.listen(3000,()=>{
    console.log(`app running in localhost:${3000}`);
    
})