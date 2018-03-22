const Transaction = require('./Transaction.js');
const Block = require('./Block.js');

const readline = require('readline');
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 10;
        this.maxPendingTransactions = 3;
    }



    // Creating the first (genesis) block
    createGenesisBlock() {
        return new Block("17/03/2018", "GenesisBlock", '');
    }

    // Querying for the latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }

    pushNewBlock(block) {
        this.chain.push(block);
    }


    // Verifying whole chain
    verifyChain() {
        for (let i = 2; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];


            if (currentBlock.hash !== currentBlock.calculateHashTransaction()) {
                return false;
            }

            if (currentBlock.PreviousHash !== previousBlock.hash) {
                return false;
            }
            return true;
        }
    }

    // Because of block structure, transactions are first added to an array of pending transactions.
    addTransactionsToPendingTransactions(transaction) {
        this.pendingTransactions.push(transaction)
        let transactionNumber = this.pendingTransactions.length;
        let blockNumber = this.chain.length;
        console.log("Added Transaction " + transactionNumber + " to Block " + blockNumber + " -> unconfirmed");

        // When enough transactions, they are sent to the mine method
        if (this.pendingTransactions.length >= this.maxPendingTransactions) {
            this.minePendingTransactions(this.pendingTransactions);
        }
    }

    // Method for mining
    minePendingTransactions(transactions) {
        let newBlock = new Block("10/19/12", transactions);
        newBlock.previousHash = this.getLatestBlock().hash;

        // Generate Hashes of transactions
        for (let i = 0; i <= transactions.length - 1; i++) {
            newBlock.transactions[i].hash = newBlock.calculateHashTransaction(transactions[i]);
        }

        // Generating Block Hash using Transaction hashes
        newBlock.hash = newBlock.mineBlock(transactions, this.difficulty);

        this.pushNewBlock(newBlock);

        // Because they are written to the blockchain, the pending transactions are wiped
        this.pendingTransactions = [];
    }

    addCar(newOwner, make, model, carID) {
        this.addTransactionsToPendingTransactions(new Transaction({ 'oldOwner': "addToSystem", 'newOwner': newOwner, 'make': make, 'model': model, 'carID': carID }));
    }

    transferCar(oldOwner, newOwner){

    }
    transferObject(oldOwner, newOwner, ObjectID) {

    }




    // Methods for querying the chain

    // Querying for specific make
    queryMake(make) {
        for (let i = 0; i < this.chain.length; i++) {
            if (this.chain[i].data.make == make) {
                console.log(this.chain[i].data);
            }
        }
    }

    queryModel(model) {
        for (let i = 0; i < this.chain.length; i++) {
            if (this.chain[i].data.model == model) {
                console.log(this.chain[i].data);
            }
        }
    }

    queryCarID(carID) {
        let foundTransactions = []; 
        for (let i = 0; i < this.chain.length - 1; i++) {
            for (let k = 0; k < this.chain[i + 1].transactions.length; k++) {
                if (this.chain[i + 1].transactions[k].data.carID == carID) {
                    // console.log(this.chain[i + 1].transactions[k].data.oldOwner + " -> " + this.chain[i + 1].transactions[k].data.newOwner);
                    console.log(this.chain[i + 1].transactions[k]);
                    foundTransactions.push(this.chain[i + 1].transactions[k])
                }
            }
        }

        return foundTransactions;
    }

    printQueryResults(transactions){
        for(let i = 0; i < transactions.length; i++){
            console.log((i + 1) + ". Transaktion: " + transactions[i].data.oldOwner + " => " + transactions[i].data.newOwner);
        }
    }
}

module.exports = Blockchain;