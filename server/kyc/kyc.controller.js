const Kyc = require('./kyc.model');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
var validator = require('email-validator');

async function createKycUser(req, res, next) {

  var email = req.body.email;
  var kyc_owner = req.params.kyc_owner

  if (!validator.validate(email)) {
    res.sendStatus(400);
    return
  }

  const kycUser = await Kyc.getKycUser(kyc_owner, email);
  if (kycUser != '') {
    res.json(kycUser[0].uuid);
    return;
  }

  const uuid = uuidv4();

  const kyc = new Kyc({
    uuid: uuid,
    email: email,
    kyc_owner: kyc_owner,
    status: "inprogress"
  });

  await kyc.save()
  res.send(uuid.toString())
}

async function updateKyc(req, res, next) {

  var kyc_owner = req.params.kyc_owner
  var uuid = req.params.uuid

  const kycUser = await Kyc.getKycUserWithUUID(kyc_owner, uuid);
  if (kycUser == '') {
    res.sendStatus(404);
    return;
  }

  var updateVals = {
    user_ip: req.body.user_ip,
    type: req.body.type,
    pep: req.body.pep,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    nationality: req.body.nationality,
    id_number: req.body.id_number,
    phone: req.body.phone,
    phone_verified: req.body.phone_verified,
    country: req.body.country,
    postcode: req.body.postcode,
    city: req.body.city,
    street: req.body.street,
    bdate: req.body.bdate,
    fileFundsText: req.body.fileFundsText,
    sow: req.body.sow,
    custom: req.body.custom,
    addresses: req.body.addresses,
  }

  await Kyc.updateKycUser(kyc_owner, uuid, updateVals)

  res.sendStatus(201);
}

async function getKycStatus(req, res, nex) {

  var kyc_owner = req.params.kyc_owner
  var uuid = req.params.uuid

  const kycUser = await Kyc.getKycUserWithUUID(kyc_owner, uuid);
  if (kycUser != '') {
    res.json(kycUser[0].status);
    return;
  } else {
    res.text("inprogress")
  }
}

module.exports = { createKycUser, updateKyc, getKycStatus };
