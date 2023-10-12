import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    await mongoose.connect(process.env.URL)
    console.log('Succesfull Connected to mongoDB')
  } catch (error) {
    console.log(error.message)
  }
}

export default connect
