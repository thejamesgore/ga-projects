import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const countriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String },
    yearVisited: { type: Number, required: true },
    comments: { type: String, maxlength: 300 },
    rating: { type: Number, min: 1, max: 5 },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
  },
  { timestamp: true }
)

countriesSchema.plugin(mongooseUniqueValidator)

const Country = mongoose.model('Country', countriesSchema)

export default Country
