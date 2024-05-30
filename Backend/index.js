const dotenv = require("dotenv");
dotenv.config();

//Routes
const productRoutes = require("./routes/ProductRoute");
const shopRoutes = require("./routes/ShopRoute");
const supplierRoutes = require("./routes/SupplierRoute");

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

//All route starts with /product will be redirected to productRoute
app.use("/product", productRoutes);

//All route starts with /shop will be redirected to shopRoute
app.use("/shop", shopRoutes);

//All route starts with /supplier
app.use("/supplier", supplierRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} `);
});