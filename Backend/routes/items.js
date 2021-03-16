const router = require('express').Router();
let Items = require('../models/items.model');

router.route('/').get((req, res) => {
  Items.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const item = req.body.item;
  const quantity = Number(req.body.quantity);
  const date = Date.parse(req.body.date);

  const newItems = new Items({
    username,
    item,
   quantity,
    date,
  });

  newItems.save()
  .then(() => res.json('ITEMS added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Items.findById(req.params.id)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Items.findByIdAndDelete(req.params.id)
    .then(() => res.json('ITEMS deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Items.findById(req.params.id)
    .then(items => {
      items.username = req.body.username;
      items.item = req.body.item;
      items.quantity = Number(req.body.quantity);
      items.date = Date.parse(req.body.date);

      items.save()
        .then(() => res.json('Items updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;