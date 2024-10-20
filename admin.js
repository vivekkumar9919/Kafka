const { kafka } = require('./client')

async function initAdmin() {
    const admin = kafka.admin()
    console.log("Connection to the admin");
    admin.connect();
    const currentTopics = await admin.listTopics()
    console.log("Current topics:-", currentTopics)
    const topicCreateed = await admin.createTopics({
        topics: [
            {
                topic: "Testing-topic-1",
                numPartitions: 2,
                replicationFactor: 1
            }
        ]
    })
    topicCreateed ? console.log("Topic created successfully", topicCreateed) : console.log("Failed to create topic", topicCreateed)

    admin.disconnect();
}

initAdmin();