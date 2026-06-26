const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        restaurantId: {
            type: String,
            required: true
        },
        restaurantName: {
            type: String,
            required: true
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "PENDING"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);