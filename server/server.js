const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const EmployerController = require('../database/controller/Employer');

const port = 3000;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port);

app.post('/employer', (req, res) => {
  const { email, password, company } = req.body;
  EmployerController.createEmployer(email, password, company, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
});
