import Country from '../models/country.js'
import { countrySeedData } from './countrySeedData.js'
import { connectDb, truncateDb, disconnectDb } from './helpers.js'
import dotenv from 'dotenv'

dotenv.config()

async function seedDatabase() {
  try {
    await connectDb()
    console.log('🤘🤘🤘🤘 CONNECTED TO DATABASE 🤘🤘🤘🤘')

    await truncateDb()
    console.log(`🔥🔥🔥🔥 Database dropped 🔥🔥🔥🔥`)

    const country = await Country.create(countrySeedData)
    console.log(
      `🤖🤖🤖🤖 ${country.length} countries added to the database🤖🤖🤖🤖`
    )
  } catch (err) {
    console.log(`🚨🚨🚨🚨 Something went wrong seeding the database`, err)
  }

  disconnectDb()
}

seedDatabase()
