'use strict';

// Shoe - shoe model
// shoes - array of shoe Objects
// id - id we're looking for

var express = require('express');
var router = express.Router();

var Trans = require('../models/transaction');

router.get('/', function(req, res) {

  Trans.get(function(err, trans) {
    if(err) return res.status(400).send(err);  //catch all error respone
    res.send(trans);
  });
});

router.post('/', function(req, res) {
  var newTrans = req.body;

  Trans.create(newTrans, function(err) {
    if(err) return res.status(400).send(err);
    else res.send();
  });
});

router.get('/:id', function(req, res){
  var id = req.params.id;

  Trans.get(function(err, trans) {
    if(err) return res.status(400).send(err);
    trans = trans.find(function(obj) {
      return obj.id === id;
    });

    if(!trans) return res.status(404).send({err: 'Transaction not found'});
    res.send(trans);
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Trans.delete(id, function(err) {
    if(err) return res.status(400).send(err);
    res.send('deleted');
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;

  Trans.update(id, updatesObj, function(err, updatedTrans) {
    if(err) return res.status(400).send(err);
    res.send(updatedTrans);
  });
});

module.exports = router;
