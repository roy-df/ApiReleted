var express = require('express');
var async = require("async");
var mongojs = require('mongojs');
var db = mongojs('testdb',['testdb']);
var cities =db.collection("cities");

function addcities(){


   var citiesOBJ = {
        0: {
            city: "Select City"
        },
        1: {
            city: "Pune"
        },
        2: {
            city: "Banglore"
        },
        3: {
            city: "Mumbai"
        },
        4: {
            city: "Delhi"
        },
        5: {
            city: "Noida"
        }
    };
    cities.find().toArray(function(err, doc){
    if(err){
      console.log(err);
    }else{
      if(doc.length > 0){
        console.log("cities already added");
      }else{
        async.each( citiesOBJ, function( item, callback ){
          cities.insert(item, function(err, result){
          if (err) {
            console.log(err);
            callback();
          } else {
            console.log(result);
            callback();
          }
          });
        },function(err){
          if(err){
            console.log(err);
          }else{
            console.log('done');
          }
        });
      }
    }
  })
}

addcities();

exports.getCities = function (req, res) {
  cities.find().toArray(function(err, doc){
    if(err){
      var resdata = {
        status : 0,
        message : err
      }
      res.jsonp(resdata);
    }else{
      res.jsonp(doc);
    }
  })
}


exports.addtodos = function(req,res){
/*	var rem_Date = req.body.reminder_date;
    var startTime = new Date(rem_Date);
    var reminderdate = startTime.getTime();

   	var rem_time = req.body.reminder_time;
    var Time = new Date(rem_Date);
    var remindertime = Time.getTime();*/

  	  todosCRUD.create({
  	  	'todo_data':req.body.todo_data,
  	  	'user_id':req.body.user_id,
  	  	'reminder_date':req.body.reminder_date,
  	  	'reminder_time':req.body.reminder_time,
  	  	'created_on':env.timestamp(),
  	  	'modified_on':env.timestamp()
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        todo_id: result.insertId,
	        message: 'Todos Inserted successfully'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos Failed Insert'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.gettodos = function(req,res){
  	  todosCRUD.load({
  	  	'user_id':req.body.user_id
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos List'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos List Failed'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.gettododetails = function(req,res){
  	  todosCRUD.load({
  	  	'todo_id':req.body.todo_id
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos List'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos List Failed'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.updatetodos = function(req,res){
	/* var rem_Date = req.body.reminder_date;
     var startTime = new Date(rem_Date);
     var reminderdate = startTime.getTime();*/
  	  
  	  todosCRUD.update({
  	  	'todo_id':req.body.todo_id,
  	  },{
  	  	'todo_data':req.body.todo_data,
  	  	'reminder_date':req.body.reminder_date,
  	  	'reminder_time':req.body.reminder_time,
  	  	'modified_on':env.timestamp()
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos Updated successfully'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos Failed to Update'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.deletetodo = function(req,res){
	todosCRUD.destroy({
	    'todo_id': req.body.todo_id
	  }, function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos Deleted successfully'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos Failed to Delete'
	      }
	      res.jsonp(responsedata);
	    }
	    
  });
}	