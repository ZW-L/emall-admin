const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminsSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  pwd: String,
  avatar: String,
  permission: { type: Number, default: 5 }
})
mongoose.model('Admins', AdminsSchema)
