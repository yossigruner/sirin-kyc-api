const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * KYC Schema
 */
const KycSchema = new mongoose.Schema({

  status: {
    type: String
  },
  kyc_owner: {
    type: String
  },
  uuid: {
    type: String
  },
  user_ip: {
    type: String
  },
  type: {
    type: String
  },
  pep: {
    type: Boolean
  },
  first_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  email: {
    type: String
  },
  nationality: {
    type: String
  },
  id_number: {
    type: String
  },
  phone: {
    type: String
  },
  phone_verified: {
    type: Boolean
  },
  country: {
    type: String
  },
  postcode: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  bdate: {
    type: Date
  },
  fileFundsText: {
    type: String
  },
  sow: {
    sow_business_activities: {
      type: Boolean
    },
    sow_stock_sales: {
      type: Boolean
    },
    sow_real_estate_sale: {
      type: Boolean
    },
    sow_donation: {
      type: Boolean
    },
    sow_inherited: {
      type: Boolean
    },
    sow_crypto_trading: {
      type: Boolean
    },
    sow_ico_contribution: {
      type: Boolean
    },
    sow_other: {
      type: Boolean
    }
  },
  custom: {
    type: [
    ]
  },
  addresses: {
    type: [
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
KycSchema.method({
});

/**
 * Statics
 */
KycSchema.statics = {

  /**
   * Get kyc user by owner and email
   */
  getKycUser(kyc_owner, email) {
    return this.find({ kyc_owner: kyc_owner, email: email })
      .exec()
      .then((kyc) => {
        if (kyc) {
          return kyc;
        }
        const err = new APIError('No such kyc exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getKycUserWithUUID(kyc_owner, uuid) {

    return this.find({ kyc_owner: kyc_owner, uuid: uuid })
      .exec()
      .then((kyc) => {
        if (kyc) {
          return kyc;
        }
        const err = new APIError('No such kyc exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  updateKycUser(kyc_owner, uuid, kycUser) {
    return this.update({ kyc_owner: kyc_owner, uuid: uuid }, kycUser)
      .exec()
      .then((kyc) => {
        if (kyc) {
          return kyc;
        }
        const err = new APIError('No such kyc exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef Post
 */
module.exports = mongoose.model('Kyc', KycSchema);
