var express = require('express');
var http = require('http');
var mongojs=require('mongojs');
var db=mongojs('testdb',['testdb']);
var car=db.collection("car");

exports.addcar = function(req,res){
   console.log("req.body", req.body)

      car.insert(req.body, function(err, result){
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.jsonp(result);
          }
          });
        }

      exports.getCar = function (req, res) {
      car.find().toArray(function(err, result){
    if(err){
      var resdata = {
        status : 0,
        message : err
      }

      res.jsonp(resdata);
    }else{
    	console.log(result);
      res.jsonp(result);
    }
  })
}

  exports.getCarDetails = function (req, res) {
    console.log('req.body.carId', req.body.carId);
    car.find({ _id : req.body.carId}).toArray(function(err, result){
      if(err){
        var resdata = {
          status : 0,
          message : err
        }
        res.jsonp(resdata);
      }else{
        res.jsonp(result);
      }
    })
  }
