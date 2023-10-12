import amqp from 'amqplib'
import connect from './database/index.js'
import LogIssues from './models/logIssues.js'
import { notification } from './utils/notifications.js'
import dotenv from 'dotenv'
dotenv.config()

const connected = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URI)

  const channel = await connection.createChannel()
  const queue = process.env.RABBITMQ_QUEUE

  channel.assertQueue(queue, { durable: true })

  channel.consume(queue, messages => {
    const data = messages.content.toString()
    const responseJson = JSON.parse(data)

    const { issuesId, issuesName, username: member, phoneNumber: memberPhoneNumber, message, timestamp: date } = responseJson

    console.log(responseJson)
    channel.ack(messages)

    const logIssues = new LogIssues({
      issuesId,
      issuesName,
      member,
      memberPhoneNumber,
      message,
      date
    })

    try {
      logIssues.save()
      console.log('Data Telah Masuk Ke database')

      notification(memberPhoneNumber, 'Redmine', message)
      console.log('Notifikasi telah berhasil masuk')
    } catch (error) {
      console.log(error.message)
    }
  }, { noAck: false })
}

connected()
connect()
