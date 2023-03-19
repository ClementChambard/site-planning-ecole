const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rollerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  roller: {
    type: Number,
  },
  pointure: {
    type: Number,
  },
  casque: {
    type: Number,
  },
  protec: {
    type: Number,
  }
}, {
  timestamps: true,
});

const Roller = mongoose.model('Roller', rollerSchema);

module.exports = Roller;
