const { kafka } = require('./client')

async function initProducer(){
    const producer= kafka.producer()
    // Connect producer
    await producer.connect();

    // Produce messages
    await producer.send({
        topic: 'Testing-topic-1',
        messages: [
            { key: 'key1', value: 'testing message 3' },
            { key: 'key2', value: 'testing message 4' }
        ],
    })

    await producer.disconnect()
    console.log("Producer disconnected")
}

initProducer();