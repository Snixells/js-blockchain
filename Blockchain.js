const Transaction = require('./Transaction.js');
const Block = require('./Block.js');
const DatabaseBlockchain = require('./chaindb.js');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.miningReward = 10;
        this.maxPendingTransactions = 3;
    }

    // Creating the first (genesis) block
    createGenesisBlock() {
        return new Block("GenesisBlock", '');
    }

    // Querying for the latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }

    pushNewBlock(block) {
        this.chain.push(block);
        console.log(JSON.stringify(block), null, 3);
        // DatabaseBlockchain.insertToChainDatabase(block);
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

        // Adding unconfirmed transaction to database
        console.log('Adding to db!!');
        console.log(transaction);
        DatabaseBlockchain.insertToUnconfirmedDatabase(transaction);

        // When enough transactions, they are sent to the mine method
        if (this.pendingTransactions.length >= this.maxPendingTransactions) {
            this.minePendingTransactions(this.pendingTransactions);
        }
    }

    // Validating Transacions which are in "unconfirmed"

    validateTransactions() {
        let unvalidatedTransactions, transactionsToValidate = [];
        DatabaseBlockchain.getUnconfirmedDB(result => {
            unvalidatedTransactions = result;
            console.log("UNVALIDATED");
            for (let i = 0; i < unvalidatedTransactions.length; i++) {
                transactionsToValidate.push((new Transaction({
                    'oldOwner': unvalidatedTransactions[i].data.oldOwner, 'newOwner': unvalidatedTransactions[i].data.newOwner, 'make': unvalidatedTransactions[i].data.make,
                    'model': unvalidatedTransactions[i].data.model, 'carID': unvalidatedTransactions[i].data.carID
                })));
            }

            for (let i = 0; i < transactionsToValidate.length; i++) {
                console.log("Will be validated: " + transactionsToValidate[i], null, 2);
            }

            console.log(JSON.stringify(transactionsToValidate[2], null, 3));
            this.addBlockOfValidatedTransactions(transactionsToValidate);

            // SEND TO PEERS TO CONSENSUS (LATER, MAYBE HERE SOMEWHERE)
        });
}

// Method for mining

addBlockOfValidatedTransactions(transactions){
    let newBlock = new Block(transactions);
    
    for (let i = 0; i <= transactions.length - 1; i++) {
        newBlock.transactions[i].hash = newBlock.calculateHashTransaction(transactions[i]);
    }

    newBlock.hash = newBlock.mineBlock(transactions, this.difficulty);

    this.chain.push(newBlock);
    console.log("pushed!");

}


minePendingTransactions(transactions) {
    let newBlock = new Block(transactions);
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

// Method for adding a new car to the system
addCar(newOwner, make, model, carID) {
    this.addTransactionsToPendingTransactions(new Transaction({ 'oldOwner': "addToSystem", 'newOwner': newOwner, 'make': make, 'model': model, 'carID': carID }));
}

// Transfering a char from oldOwner to newOwner
transferCar(newOwner, transaction) {
    if (this.checkOwner() == true) {
        this.addTransactionsToPendingTransactions(new Transaction({
            'oldOwner': transaction.data.newOwner, 'newOwner': newOwner, 'make': transaction.data.make,
            'model': transaction.data.model, 'carID': transaction.data.carID
        }));
    }
}

// Gets owner of 1 transaction 
getOwner(transaction) {
    return transaction.data.newOwner;
}

// Checks wether owner is owner of specific car
checkOwner(owner, searchedOwner) {
    // if (owner == searchedOwner)
    return true;
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

// Querying for specific car model 
queryModel(model) {
    for (let i = 0; i < this.chain.length; i++) {
        if (this.chain[i].data.model == model) {
            console.log(this.chain[i].data);
        }
    }
}

// Querying for carID -> every car has own ID in System, to keep track
queryCarID(carID) {
    let foundTransactions = [];
    for (let i = 0; i < this.chain.length - 1; i++) {
        for (let k = 0; k < this.chain[i + 1].transactions.length; k++) {
            if (this.chain[i + 1].transactions[k].data.carID == carID) {
                foundTransactions.push(this.chain[i + 1].transactions[k])
            }
        }
    }

    return foundTransactions;
}

// Printing the transaction query results
printQueryResults(transactions) {
    for (let i = 0; i < transactions.length; i++) {
        console.log((i + 1) + ". Transaktion: " + transactions[i].data.oldOwner + " => " + transactions[i].data.newOwner);
    }
}

// Choose one of the query results
chooseQueryResult(number, transactions) {
    return transactions[number - 1];
}

// Chooses the latest of transactions array
chooseLatestTransaction(transactions) {
    return this.chooseQueryResult(transactions.length, transactions)
}

// Searches for carID and finds the owner of that car
getOwnerFindByCarID(CarID) {
    let queryResults, lastTransaction;
    queryResults = this.queryCarID(CarID);
    lastTransaction = this.chooseLatestTransaction(queryResults);
    return this.getOwner(lastTransaction)
}
}

module.exports = Blockchain;