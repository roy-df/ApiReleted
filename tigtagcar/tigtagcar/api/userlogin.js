var express = require('express');
var http = require('http');
var md5 = require('MD5')
var async = require("async");
var mongojs = require('mongojs');
var db = mongojs('testdb', ['testdb']);
console.log(db);
var cities = db.collection("cities");
var user = db.collection("user");
exports.login = function(req, res) {
    var password = md5(req.body.password);
    user.findOne({
        'email': req.body.userEmail,
        'password': password
    }, function(err, doc) {
        if (err) {
            var resdata = {
                record: '',
                status: 0,
                message: 'Something Went Wrong.'
            };
            res.jsonp(resdata);
        } else {
            if (doc != null) {
                var resdata = {
                    record: doc,
                    status: 1,
                    message: 'Done.'
                };
                res.jsonp(resdata);
            } else {
                var resdata = {
                    record: '',
                    status: 2,
                    message: 'You Enter Wrong Password or user not exists.'
                };
                res.jsonp(resdata);
            }
        }
    })
}
exports.signup = function(req, res) {
    user.findOne({
        email: req.body.email
    }, function(err, doc) {
        if (err) {
            var resdata = {
                record: '',
                status: 0,
                message: 'Something Went Wrong.'
            };
            res.jsonp(resdata);
        } else {
            if (doc != null) {
                var resdata = {
                    record: '',
                    status: 2,
                    message: 'user already exists.'
                };
                res.jsonp(resdata);
            } else {
                var password = md5(req.body.password);
                user.insert({
                    'email': req.body.email,
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                    'password': password,
                    'mobile': req.body.mobile,
                    'birthdate': req.body.birthdate
                }, function(err, result) {
                    if (err) {
                        var resdata = {
                            record: '',
                            status: 3,
                            message: 'Something Went Wrong.'
                        };
                        res.jsonp(resdata);
                    } else {
                        var resdata = {
                            record: '',
                            status: 1,
                            message: 'Done'
                        };
                        res.jsonp(resdata);
                    }
                });
            }
        }
    })
}
 exports.FacebookLogin = function(req, res) {
    console.log(req.body);
    user.findOne({
        email: req.body.email
    }, function(err, doc) {
        if (err) {
            var resdata = {
                record: '',
                status: 0,
                message: 'Something Went Wrong.'
            };
            res.jsonp(resdata);
        } else {
            if (doc != null) {
                var resdata = {
                    record: doc,
                    status: 1,
                    message: 'Done1.'
                };
                res.jsonp(resdata);
            } else {
                user.insert({
                    'email': req.body.email,
                    'firstname': req.body.first_name,
                    'lastname': req.body.last_name,
                    'FBID' : req.body.id,
                    'profile_image' : req.body.picture.data.url,
                    'gender' : req.body.gender
                }, function(err, result) {
                    if (err) {
                        var resdata = {
                            record: '',
                            status: 0,
                            message: 'Something Went Wrong.'
                        };
                        res.jsonp(resdata);
                    } else {
                        var resdata = {
                            record: result,
                            status: 1,
                            message: 'Done'
                        };
                        res.jsonp(resdata);
                    }
                });
            }
        }                
    })
}

exports.googleLogin = function(req, res) {
    console.log(req.body);
    user.findOne({
        email: req.body.email
    }, function(err, doc) {
        if (err) {
            var resdata = {
                record: '',
                status: 0,
                message: 'Something Went Wrong.'
            };
            res.jsonp(resdata);
        } else {
            if (doc != null) {
                var resdata = {
                    record: doc,
                    status: 1,
                    message: 'Done1.'
                };
                res.jsonp(resdata);
            } else {
                user.insert({
                    'email': req.body.email,
                    'firstname': req.body.given_name,
                    'lastname': req.body.family_name,
                    'GoogleID' : req.body.id,
                    'profile_image' : req.body.picture,
                    'gender' : req.body.gender
                }, function(err, result) {
                    if (err) {
                        var resdata = {
                            record: '',
                            status: 0,
                            message: 'Something Went Wrong.'
                        };
                        res.jsonp(resdata);
                    } else {
                        var resdata = {
                            record: result,
                            status: 1,
                            message: 'Done'
                        };
                        res.jsonp(resdata);
                    }
                });
            }
        }                
    })
}