const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
    "/users",
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/api/users${path}`
    })
);

router.use(
    "/restaurants",
    createProxyMiddleware({
        target: process.env.RESTAURANT_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/api/restaurants${path}`
    })
);

router.use(
    "/orders",
    createProxyMiddleware({
        target: process.env.ORDER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/api/orders${path}`
    })
);

module.exports = router;