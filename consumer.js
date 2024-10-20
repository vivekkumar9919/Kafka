const { kafka } = require('./client'); 
async function initConsumer() {
    const consumer = kafka.consumer({ groupId: "testing-consumer" });

    try {
        // Connect the consumer
        await consumer.connect();
        console.log('Consumer connected.');

        // Subscribe to topics
        await consumer.subscribe({ topics: ["Testing-topic-1"], fromBeginning: true });
        console.log('Subscribed to topic: Testing-topic-1');

        // Consume messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    key: message.key ? message.key.toString() : null, 
                    topic,
                    partition,
                    value: message.value.toString(),
                    headers: message.headers,
                });
            },
        });
    } catch (error) {
        console.error('Error in consumer:', error);
    }
}

initConsumer();
