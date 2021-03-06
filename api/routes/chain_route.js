const express = require('express');
const router = express.Router();
const DatabaseBlockchain = require('../../chaindb.js');

router.get('/', (req, res, next) => {
    DatabaseBlockchain.getChain(result => {
        res.status(200).json(result);
    }) 
})

module.exports = router;