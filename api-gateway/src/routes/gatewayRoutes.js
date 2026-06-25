const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

// User Service Proxy
router.use(
    "/users",
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/users": "/api/users"
        }
    })
);

// Restaurant Service Proxy
router.use(
    "/restaurants",
    createProxyMiddleware({
        target: process.env.RESTAURANT_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/restaurants": "/api/restaurants"
        }
    })
);

// Order Service Proxy
router.use(
    "/orders",
    createProxyMiddleware({
        target: process.env.ORDER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/orders": "/api/orders"
        }
    })
);

module.exports = router;