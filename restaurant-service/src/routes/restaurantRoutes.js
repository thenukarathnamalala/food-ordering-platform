const express = require("express");

const {
    createRestaurant,
    getRestaurants,
    getRestaurantById
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

module.exports = router;