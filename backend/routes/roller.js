const router = require('express').Router();
let Roller = require('../models/roller.model');

router.route('/').get((req, res) => {
  Roller.find()
      .then(roller => res.json(roller))
      .catch(err => res.status(400).json('Error: ', + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const roller = req.body.roller;
  const pointure = req.body.pointure;
  const casque = req.body.casque;
  const protec = req.body.protec;

  const newRoller = new Roller({
    name,
    roller,
    pointure,
    casque,
    protec
  });

  newRoller.save()
         .then(() => res.json('Roller added!'))
         .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Roller.findById(req.params.id)
      .then(roller => res.json(roller))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Roller.findByIdAndDelete(req.params.id)
      .then(() => res.json('Roller deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Roller.findById(req.params.id)
      .then(roller => {
        roller.name = req.body.name;
        roller.roller = req.body.roller;
        roller.pointure = req.body.pointure;
        roller.casque = req.body.casque;
        roller.protec = req.body.protec;

        roller.save()
            .then(() => res.json('Roller updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
