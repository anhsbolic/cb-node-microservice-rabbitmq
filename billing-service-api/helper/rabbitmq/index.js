const amqp = require('amqplib');
const config = require('../../config');

const BILLING_CREATE_QUEUE = 'billingCreateQueue';

const publish = async (queueName, data) => {
  try {
    let conn = await amqp.connect(config.rabbitMqConnString);
    let channel = await conn.createChannel();

    let queueOK = await channel.assertQueue(queueName, {
      durable: false,
    });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    console.log(`Msg data published to RabbitMQ with name ${queueName}`);

    channel.close();

    return queueOK;
  } catch (err) {
    throw err;
  }
};

module.exports = { BILLING_CREATE_QUEUE, publish };
