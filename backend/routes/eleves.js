const router = require('express').Router();
let Eleve = require('../models/eleve.model');

router.route('/').get((req, res) => {
  Eleve.find()
      .then(eleves => res.json(eleves))
      .catch(err => res.status(400).json('Error: ', + err));
});

router.route('/add').post((req, res) => {
  const elevename = req.body.elevename;

  const newEleve = new Eleve({elevename});

  newEleve.save()
         .then(() => res.json('Eleve added!'))
         .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Eleve.findById(req.params.id)
      .then(eleve => res.json(eleve))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Eleve.findByIdAndDelete(req.params.id)
      .then(() => res.json('Eleve deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Eleve.findById(req.params.id)
      .then(eleve => {
        eleve.elevename = req.body.elevename;

        eleve.save()
            .then(() => res.json('Eleve updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
