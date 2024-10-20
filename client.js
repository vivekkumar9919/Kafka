const { Kafka } = require('kafkajs')

 exports.kafka = new Kafka({
    clientId: 'testing-app',
    brokers: ['localhost:9092'],
    connectionTimeout: 5000*1000
  })