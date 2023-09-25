import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on('connected', () => {
      console.log('DB connected successfully')
    })
    connection.on('error', (err) => {
      console.log('MongoDB connection error: ', err)
    })
  } catch (err) {
    console.log(err)
  }
}
