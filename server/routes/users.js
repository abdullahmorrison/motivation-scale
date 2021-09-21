const express = require('express');
const router = express.Router();

const { 
    googleLogin
} = require ('../controllers/users.js');


router.post('/googlelogin', googleLogin);

module.exports = router;