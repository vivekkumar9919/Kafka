const { kafka } = require('./client'); 

async function initConsumer(consumerId) {
    const consumer = kafka.consumer({ groupId: "testing-consumer" });

    try {
        // Connect the consumer
        await consumer.connect();
        console.log(`Consumer ${consumerId} connected.`);

        // Subscribe to topics
        await consumer.subscribe({ topics: ["Testing-topic-1"], fromBeginning: true });
        console.log(`Consumer ${consumerId} subscribed to topic: Testing-topic-1`);

        // Consume messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Consumer ${consumerId}:`, {
                    key: message.key ? message.key.toString() : null, 
                    topic,
                    partition,
                    value: message.value.toString(),
                    headers: message.headers,
                });
            },
        });
    } catch (error) {
        console.error(`Error in consumer ${consumerId}:`, error);
    }
}

// Initialize two consumers
initConsumer('1');
initConsumer('2');
