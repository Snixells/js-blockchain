// Class for the Blocks the Chain will consist of later

const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0;
    }

    // Calculating Hash for Transaction
    calculateHashTransaction(transaction) {
        return SHA256(transaction.timestamp + JSON.stringify(transaction.data)).toString();
    }

    // Calculating Hash for Block -> using hashes of all transactions inside that block
    calculaHashBlock(transactions) {
        let hashNumber = "";
        for (let i = 0; i < this.transactions.length; i++) {
            hashNumber += JSON.stringify(transactions[i].hash);
        }
        hashNumber += this.nonce;

        return SHA256(hashNumber).toString();
    }

    // Including poW -> specific number of zeros at beginning of hash 
    mineBlock(transactions, difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce += 1;
            this.hash = this.calculaHashBlock(transactions);
        }

        console.log("Mining Block ; Hash -> " + this.hash + " After " + this.nonce + " calculations")

        return this.hash;
    }

}

module.exports = Block;