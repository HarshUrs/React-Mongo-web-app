const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  username: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Items = mongoose.model('Item',itemsSchema);

module.exports = Items;