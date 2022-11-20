const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eleveSchema = new Schema({
  elevename: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Eleve = mongoose.model('Eleve', eleveSchema);

module.exports = Eleve;
