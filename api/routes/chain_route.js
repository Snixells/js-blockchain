const express = require('express');
const router = express.Router();
const DatabaseBlockchain = require('../../chaindb.js');

router.get('/', (req, res, next) => {
    DatabaseBlockchain.getChain(('bla'), callback => {
        console.log(callback);
        res.status(200).json(callback);
    })
    
})

module.exports = router;