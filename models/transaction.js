'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var transactionPathFile = path.join(__dirname, '../data/transactions.json');

exports.get = function(cb) {
  fs.readFile(transactionPathFile, function(err, data) {
    if(err){ return cb(err); }

    var trans = JSON.parse(data);
    cb(null, trans);
  });
};

exports.create = function(newTran, cb) {
  this.get((err, trans) => {
    if(err){ return cb(err); }
    newTran.id = uuid();
    trans.push(newTran);
    this.write(trans, cb);
  });
};

exports.write = function(trans, cb) {
  fs.writeFile(transactionPathFile, JSON.stringify(trans), cb);
};


exports.delete = function(id, cb){
  this.get((err, trans) => {
  if(err) return cb(err);

  var transLength = trans.length;
  var newTrans = trans.filter(function(item) {
    return item.id !== id;
  });

  if(transLength === newTrans.length){
    cb({err: 'Transaction not found'});
  }

  this.write(newTrans, cb);
  });
};

exports.update = function(id, updatesObj, cb) {
  this.get((err, trans) => {
    if(err) return cb(err);

    var updatedTran;
    var updatedTrans = trans.map(function(item) {
      if(item.id === id){
        for(var key in updatesObj){
          item[key] = updatesObj[key]
        }
        updatedTran = item;
      }
      return item;
    });
    if(!updatedTran){
      cb({err: 'Shoe not found'});
    }

    this.write(updatedTrans, function(err) {
      cb(err, updatedTran);
    });
  });
};
