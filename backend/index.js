const express = require("express");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./scocket/scoket");
const app = express();
app.use(express.json());
app.use(cors());
const userRoute = require("./routes/userRoute");
const avalibleLorries = require("./routes/avalibleLoeies");
const booking = require("./routes/bookingRoute");
const queries = require("./routes/queryRoute");
const server = http.createServer(app);

const authenticateFirebaseToken = require("./middleware/auth")

initSocket(server); 

app.get("/", authenticateFirebaseToken ,(req,res)=>{
    res.send("helo world");
})
app.use("/api/user",userRoute);
app.use("/api/avaliblelorries",avalibleLorries);
app.use("/api/booking",booking);
app.use("/api/queries",queries);

app.listen(3000,()=>{
    console.log(`app running in localhost:${3000}`);
    
})