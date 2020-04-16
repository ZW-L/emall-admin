const mongoose = require('mongoose')
const Schema = mongoose.Schema

// address
const AddressSchema = new Schema({
  address: String,
  city: String,
  state: String,
  zip: String
}, { _id: false })
mongoose.model('Address', AddressSchema)

// billing
const BillingSchema = new Schema({
  mode: { type: String, enum: ['wx', 'ali', 'card'] },
  name: String,
  number: String,
  expire: { type: Date, default: new Date(Date.now() + 3600000) }
}, { _id: false })
mongoose.model('Billing', BillingSchema)

// order
const OrderSchema = new Schema({
  product_id: String,
  shipping: AddressSchema,
  billing: BillingSchema,
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now }
})
mongoose.model('Order', OrderSchema)

// cart
const CartItemSchema = new Schema({
  product_id: String,
  timestamp: { type: String, default: Date.now },
  total: Number
})
mongoose.model('CartItem', CartItemSchema)

const CartSchema = new Schema({
  count: Number,
  list: [CartItemSchema]
})
mongoose.model('Cart', CartSchema)

// user
const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  pwd: String,
  age: Number,
  tel: Number,
  avatar: { type: String, default: '' },
  address: [AddressSchema],
  cart: [CartSchema],
  orders: [OrderSchema]
})
mongoose.model('Users', UserSchema)
