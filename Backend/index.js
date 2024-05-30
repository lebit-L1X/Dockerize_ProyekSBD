const dotenv = require("dotenv");
dotenv.config();

//Routes
const ProductRoutes = require("./routes/ProductRoute");
const ShopRoute = require("./routes/ShopRoute");
const SupplierRoute = require("./routes/SupplierRoute");

const express = require("express");
const cors = require("cors");
const db = require("./db/db");

const app = express();
const PORT = process.env.PORT;

//Connect To the Database
db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//All route starts with /thread will be redirected to ProductRoutes
app.use("/product", ProductRoutes);

//All route starts with /user will be redirected to ShopRoute
app.use("/shop", ShopRoute);

app.use("/supplier", SupplierRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} `);
});
