const Router = require('express').Router;
const apiRouter = Router()
const helpers = require('../config/helpers.js')

const User = require('../db/schema.js').User
const Home = require('../db/schema.js').Home
  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('Home')
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure

    apiRouter
      .get('/homes', function(request, response) {
        Home.find(request.query, function(error, records) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(records)
        })
      })

      .post('/homes', function(request, response) {
        console.log(request.body)
        var newHome = new Home(request.body)
        newHome.save(function(error, houseRecord) {
          if (error) {
            return response.status(400).json(error)
          }
        User.findByIdAndUpdate(request.body.userId, request.body.userId, (err, userRecord)=>{
          if(err) {
            return response.json(err)
          } else {
            userRecord.houseId = houseRecord._id
            userRecord.save()
          }
        })
          response.json(houseRecord)        
        })
      })

      .put('/homes/:id', function(request, response) {
        Home.findByIdAndUpdate(request.params.id, request.body, {new:true}, function(error, record) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })

      .delete('/homes/:id', function(request, response) {
        Home.remove({_id: request.params.id}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `target with id ${request.params.id} has been eliminated.`
          })
        })
      })


module.exports = apiRouter