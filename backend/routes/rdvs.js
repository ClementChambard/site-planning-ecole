const router = require('express').Router();
let Rdv = require('../models/rdv.model');

router.route('/').get((req, res) => {
  Rdv.find()
     .then(exercises => res.json(exercises))
     .catch(err => res.status(400).json('Error: ', + err));
});

router.route('/add').post((req, res) => {
  const nom_eleve = req.body.nom_eleve;
  const heure = req.body.heure;
  const minute = req.body.minute;

  const newRdv = new Rdv({
    nom_eleve,
    heure,
    minute
  });

  newRdv.save()
        .then(() => res.json('Rdv added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Rdv.findById(req.params.id)
     .then(rdv => res.json(rdv))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Rdv.findByIdAndDelete(req.params.id)
     .then(() => res.json('Rdv deleted!'))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Rdv.findById(req.params.id)
     .then(rdv => {
       rdv.nom_eleve = req.body.nom_eleve;
       rdv.heure = req.body.heure;
       rdv.minute = req.body.minute;

       rdv.save()
               .then(() => res.json('Rdv updated!'))
               .catch(err => res.status(400).json('Error: ' + err));
    })
     .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
