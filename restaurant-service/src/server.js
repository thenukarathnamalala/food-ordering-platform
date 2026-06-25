const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurantRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);

app.get("/", (req, res) => {
    res.send("Restaurant Service Running");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Restaurant Service running on port ${PORT}`);
});