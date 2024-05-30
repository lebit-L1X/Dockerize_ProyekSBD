const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT;

//Routes
const productRoutes = require("./routes/ProductRoutes");
const shopRoutes = require("./routes/ShopRoute");
const supplierRoutes = require("./routes/SupplierRoutes");

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

//All route starts with /product will be redirected to threadRoutes
app.use("/product", productRoutes);

//All route starts with /shop will be redirected to userRoutes
app.use("/shop", shopRoutes);

//All route starts with /supplier will be redirected to userRoutes
app.use("/supplier", supplierRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} `);
});