import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const notification = async (number, title, content) => {
  try {
    const sending = await axios({
      method: 'post',
      url: process.env.WA_HOST,
      data: {
        number,
        title,
        content
      },
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': process.env.WA_TOKEN
      }
    })
    const responseJson = await sending.config.data
    const result = JSON.parse(responseJson)
    console.log(result)
    return result
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

export { notification }
