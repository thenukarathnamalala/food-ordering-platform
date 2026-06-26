const amqp = require("amqplib");

const consumeOrderCreated = async () => {
    try {

        const connection = await amqp.connect("amqp://localhost:5672");

        const channel = await connection.createChannel();

        const queue = "order_created_queue";

        await channel.assertQueue(queue, {
            durable: true
        });

        console.log(
            `Waiting for messages in ${queue}...`
        );

        channel.consume(queue, (message) => {

            if (message !== null) {

                const order = JSON.parse(
                    message.content.toString()
                );

                console.log(
                    "Restaurant Service received ORDER_CREATED event:"
                );

                console.log(order);

                // Simulate restaurant processing

                console.log(
                    `Preparing order ${order.orderId} for restaurant ${order.restaurantId}`
                );

                channel.ack(message);
            }

        });

    } catch (error) {

        console.error(
            "RabbitMQ Consumer Error:",
            error.message
        );

    }
};

module.exports = {
    consumeOrderCreated
};