const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const gatewayRoutes = require("./routes/gatewayRoutes");

const app = express();

app.use(cors());
//app.use(express.json());

app.use("/api", gatewayRoutes);

app.get("/", (req, res) => {
    res.send("API Gateway Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});