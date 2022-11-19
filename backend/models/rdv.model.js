const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rdvSchema = new Schema({
  nom_eleve: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Rdv = mongoose.model('Rdvs', rdvSchema);

module.exports = Rdv;
