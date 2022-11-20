const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rdvSchema = new Schema({
  nom_eleve: { type: String, required: true },
  heure: { type: Number, required: true },
  minute: { type: Number, required: true }
}, {
  timestamps: true,
});

const Rdv = mongoose.model('Rdvs', rdvSchema);

module.exports = Rdv;
