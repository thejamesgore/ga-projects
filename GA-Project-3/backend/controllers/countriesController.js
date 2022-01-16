import Country from '../models/country.js'
import User from '../models/user.js'
async function getAllCountries(_req, res, next) {
  try {
    const countries = await Country.find().populate('createdBy')

    return res.status(200).json(countries)
  } catch (err) {
    next(err)
  }
}

async function createCountry(req, res, next) {
  try {
    const newCountry = await Country.create({
      ...req.body,
      createdBy: req.currentUser._id,
    })

    return res.status(201).json(newCountry)
  } catch (err) {
    next(err)
  }
}

async function getCountry(req, res, next) {
  const id = req.params.id
  try {
    const country = await Country.findById(id).populate('createdBy')

    if (!country) {
      return res.status(404).send({ message: 'Country does not exit' })
    }
    return res.status(200).json(country)
  } catch (err) {
    next(err)
  }
}

async function deleteCountry(req, res, next) {
  try {
    const id = req.params.id

    const country = await Country.findById(id)

    if (!country) {
      return res.status(404).send({ message: 'Country does not exist' })
    }

    await country.remove()
    return res.status(200).send({ message: `${country} was deleted` })
  } catch (err) {
    next(err)
  }
}

async function updateCountry(req, res, next) {
  try {
    const id = req.params.id
    const country = await Country.findById(id)

    if (!country) {
      return res.status(404).send({ message: 'Country does not exist' })
    }

    country.set(req.body)
    const savedCountry = await country.save()

    return res.status(200).json(savedCountry)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllCountries,
  getCountry,
  createCountry,
  deleteCountry,
  updateCountry,
}
