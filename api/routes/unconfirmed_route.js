const express = require('express');
const router = express.Router();
const DatabaseBlockchain = require('../../chaindb.js');

router.get('/', (req, res, next) => {
    DatabaseBlockchain.getUnconfirmedDB(result => {
        res.status(200).json(result);
    })
})

// router.post('/validate', (req, res, next= => {
//     // Validating Transactions
// }))

module.exports = router;