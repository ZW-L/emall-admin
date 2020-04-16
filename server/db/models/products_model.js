const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: String,
  image: String,
  desc: String,
  price: Number,
  instock: Number
})
mongoose.model('Product', ProductSchema)
