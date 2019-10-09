const express = require('express');
const ApplicationController = require('../../database/controller/Application');

const router = express.Router();

router.post('/', (req, res) => {
  const { applicantId, jobId } = req.body;
  ApplicationController.createApplication(applicantId, jobId, (error, results) => {
    if (error) {
      console.log('error creating application', error);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
