const express = require ('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Employee } = require ('../models/employee');

router 
    .get('/',function(req,res){
        Employee.find((err,docs) => {
            if(!err){
                res.send(docs);
            }else{
                console.log('Error');
                
            }
        });
    });

router
    .get('/:id',function(req,res){
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send('No record wih given id :'+ req.params.id);

        }
        Employee.findById(req.params.id,function(err,doc){
            if(!err){
                res.send(doc);
            }else{
                console.log('error finding id');
                
            }

        })
    });

router
    .put('/:id',function(req,res){
        if(!ObjectId.isValid(req.body.id))
            return res.status(400).send('No record with that id');
        
        var emp = {
            name : req.body.name,
            position : req.body.position,
            office : req.body.office,
            salary : req.body.salary
        };

        Employee.findByIdAndUpdate(req.body.id,{ $set : emp},{ new : true},function(err,doc){
            if(!err){
                res.send(doc);
            }else{
                console.log('error in updating');
                
            }
        });

    });

router 
    .delete('/:id',function(req,res){
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send('no record with that id');
        }

        Employee.findByIdAndRemove(req.body.id,function(err,doc){
            if(!err){
                res.send(doc);
            }else{
                console.log('Error in deleting the employee');
                
            }
        })
    })

router
    .post('/', function(req,res){
        var emp = new Employee({
            name : req.body.name,
            position : req.body.position,
            office : req.body.office,
            salary : req.body.salary
        });
        emp.save((err,doc) => {
            if(!err){
                res.send(doc);
            }else{
                console.log('error in emp post');
                
            }
        });
    });


module.exports=router;