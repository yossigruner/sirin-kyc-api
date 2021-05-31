const express = require('express');
const kycCtrl = require('./kyc.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/v2/kyc/customers/:kyc_owner')
  .put(kycCtrl.createKycUser);

router.route('/v2/kyc/forms/:kyc_owner/:uuid')
  .put(kycCtrl.updateKyc);

router.route('/v2/kyc/status/:kyc_owner/:uuid')
  .get(kycCtrl.getKycStatus);

module.exports = router;
