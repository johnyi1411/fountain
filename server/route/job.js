const express = require('express');
const JobController = require('../../database/controller/Job');

const router = express.Router();

router.get('/', (req, res) => {
  JobController.getAllJobs((error, results) => {
    if (error) {
      console.log('error getting jobs', error);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
