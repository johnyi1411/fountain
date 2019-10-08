const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const EmployerController = require('../database/controller/Employer');

const port = 3000;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'admiration-frequently',
  resave: false,
  saveUninitialized: false,
}));
// log to view session
app.use((req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

app.listen(port);

app.post('/employer', (req, res) => {
  const { email, password, company } = req.body;
  EmployerController.createEmployer(email, password, company, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log('user signup');
    req.session.email = req.body.email;
    res.send(result);
  });
});

// app.post('/employer/login', (req, res) => {
//   const { email, password, company } = req.body;
//   EmployerController.createEmployer(email, password, company, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(result);
//     res.send(result);
//   });
// });
