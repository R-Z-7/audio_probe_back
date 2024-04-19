var express = require('express');
var router = express.Router();
const validate = require('../../utils/validator'); 
const controller = require('../staff/staff.controller');


// POST: [ SIGNUP STAFF ] -->
router.post('/staff/sign_up',validate('staff_register'),controller.staffSignUp);

// POST: [ SIGNIN STAFF ] -->
router.post('/staff/sign_in',validate('login'), controller.staffSignIn);

module.exports = router;