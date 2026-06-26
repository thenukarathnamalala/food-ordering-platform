const amqp = require("amqplib");

const publishOrderCreated = async (order) => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        const queue = "order_created_queue";

        await channel.assertQueue(queue, {
            durable: true
        });

        const message = {
            event: "ORDER_CREATED",
            orderId: order._id,
            userId: order.userId,
            restaurantId: order.restaurantId,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt
        };

        channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message)),
            {
                persistent: true
            }
        );

        console.log("ORDER_CREATED event published:", message);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Failed to publish ORDER_CREATED event:", error.message);
    }
};

module.exports = {
    publishOrderCreated
};