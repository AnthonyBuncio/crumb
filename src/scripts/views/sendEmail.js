const nodemailer = require('nodemailer');   
// import Expense from schema

// read all debts from db
    // if any are overdue   
        // send email
Expense.find(request.query).populate('debtor house').exec( function(error, records) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(records)
        })


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
    from: '"Crumb App 👻" <crumbapp.io@gmail.com>', // sender address
    to: 'anthonyb.ft@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});