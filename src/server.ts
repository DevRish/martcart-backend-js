import express from "express";
import chalk from "chalk";
import { CLIENT_URL, NODE_ENV, PORT } from "./config/keys";
import { connectDB } from "./config/databaseConn";
import { userRoutes } from "./api/userApi";
import { authRoutes } from "./api/authApi";
import { cartRoutes } from "./api/cartApi";
import { orderRoutes } from "./api/orderApi";
import { productRoutes } from "./api/productApi";
// import { manageCORS } from "./middlewares/cors";
import cors from "cors";
import { categoryRoutes } from "./api/categoryApi";
import { eventRoutes } from "./api/eventApi";
import { paymentRoutes } from "./api/paymentApi";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const connection = connectDB();

// pre-processing of request
app.use(express.json()); // http request received, which is always in string format, parse into json object always before further execution
app.use(express.urlencoded({extended:true}));

// cors middleware verify origin of request and add appropriate headers to response
// app.use(manageCORS); // not working :(
app.use(cors({
    origin: CLIENT_URL
}));

// routing
if(NODE_ENV !== "AWS") {
    app.use("/static", express.static("src/public")); // express.static expects path wrt package.json, not wrt src folder !!
}
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
    res.send("<h1>Server is running :)</h1><h3>Client and server were separated. <br> Please visit client at https://martcartdevrish.netlify.app/</h3>");
});
 
// starting the express server
app.listen(PORT, () => console.log(chalk.greenBright(`[+] Server running on port ${PORT}`)) );
