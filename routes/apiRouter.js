const Router = require('express').Router;
const apiRouter = Router()
const helpers = require('../config/helpers.js')
const nodemailer = require('nodemailer');

const User = require('../db/schema.js').User
const Home = require('../db/schema.js').Home
const Expense = require('../db/schema.js').Expense
  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query, "-password").populate('house expenses').exec( function(err, results){
      // User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
      // .populate('house debt')
    })
    
  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password").populate('house expenses').exec( function(err, record){
      // User.findById(req.params._id, "-password", function(err, record){
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

    //**********************************************
    //                FOR HOMES
    //**********************************************
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
            userRecord.house = houseRecord._id;
            userRecord.isOwner = true;
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

    //**********************************************
    //                FOR EXPENSES
    //**********************************************
    apiRouter
      .get ('/expenses', function(request, response) {
        Expense.find(request.query).populate('debtor house').exec( function(error, records) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(records)
        })
      })

      .post ('/expenses', function(request, response) {
        var newExpense = new Expense(request.body)
        newExpense.save(function(error, expenseRecord) {
          if (error) {
            return response.status(400).json(error)
          }
          //GETTING THE CURRENT USERS HOUSE ID, AND PLACING IT IN THE EXPENSE SCHEMA
          User.findByIdAndUpdate(request.body.userId, request.body.userId, (error, userRecord)=>{
            if(error) {
              return response.json(error)
            } else {
              expenseRecord.house = userRecord.house;
              expenseRecord.save()
            }
          })
          //GETTING THE 'DEBTOR' USER, AND POPULATING THE USERS EXPENSES ARRAY
          User.findByIdAndUpdate(request.body.debtor, request.body.debtor, (error, debtorRecord) => {
            if(error) {
              return response.json(error)
            } else {
              // debtorRecord.debt += expenseRecord.amount;
              // for expenses, and references, you can do the below instead
              debtorRecord.expenses = debtorRecord.expenses.concat([expenseRecord._id])
              debtorRecord.save()
            }
          })
          response.json(expenseRecord)
        })
      })

      .put ('/expenses/:id', function(request, response) {
        Expense.findByIdAndUpdate(request.params.id, request.body, {new:true}, function(error, expenseRecord) {
          if (error) {
            return response.status(400).json(error)
          }
          User.findByIdAndUpdate(request.body.debtor, request.body.debtor, (error, debtorRecord) => {
            if (error) {
              return response.json(error)
            } else if (expenseRecord.isPaid === false) {
              debtorRecord.debt += expenseRecord.amount;
              debtorRecord.save()
            } else if (expenseRecord.isPaid === true) {
              debtorRecord.debt -= expenseRecord.amount;
              debtorRecord.save()
            }
          })
          response.json(expenseRecord)
        })
      })

      .delete ('/expenses/:id', function(request, response) {
        Expense.remove({_id: request.params.id}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `target with id ${request.params.id} has been eliminated.`
          })
        })
      })


      //**********************************************
      //                SEND INVITE
      //**********************************************
      apiRouter
        .get('/sendInvite', function(request,response) {
          console.log(request.request)
            var emailAddress = request.query.email
            var houseId = request.query.houseId
            var name = request.query.name

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'crumbapp.io@gmail.com',
                    pass: 'theironyard'
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Crumb App ⏰💸👻" <crumbapp.io@gmail.com>', // sender address
                to: emailAddress, // list of receivers
                subject: 'Join the best expense app on the internet ✔', // Subject line
                html: `<h2>You have been invited by ${name} to join their exclusive house on Crumb. Use this link to sign up and get started today! <a href=https://crumbapp.herokuapp.com/#signup/${houseId}>Click here to join.</a></h2>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            })
        })


module.exports = apiRouter