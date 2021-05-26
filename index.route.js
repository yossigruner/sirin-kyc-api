const express = require('express');
const kycRoutes = require('./server/kyc/kyc.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/', kycRoutes);


module.exports = router;
