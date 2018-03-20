const SHA256 = require('crypto-js/sha256');


// Class for the Transaction 
class Transaction{
    constructor(timestamp, data){
        this.data = data;
        this.timestamp = timestamp
        this.hash = '';
    }
}

// Class for the Blocks the Chain will consist of later
class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0;
    }

    // Calculating Hash for Transaction
    calculateHashTransaction(transaction){
        return SHA256(transaction.timestamp + JSON.stringify(transaction.data)).toString();
    }

    // Calculating Hash for Block -> using hashes of all transactions inside that block
    calculaHashBlock(transactions){
        let hashNumber = "";
        for(let i = 0; i < this.transactions.length; i++){
            hashNumber += JSON.stringify(transactions[i].hash); 
        }
        hashNumber += this.nonce;

        return SHA256(hashNumber).toString();
    }

    // Including poW -> specific number of zeros at beginning of hash 
    mineBlock(transactions, difficulty){
       while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
           this.nonce += 1;
           this.hash = this.calculaHashBlock(transactions);
       }

       console.log("Mining Block ; Hash -> " + this.hash + " After " + this.nonce + " calculations")

       return this.hash;
    }

}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 10;
        this.maxPendingTransactions = 3;
    }

    // Creating the first (genesis) block
    createGenesisBlock(){
        return new Block("17/03/2018", "GenesisBlock", '');
    }

    // Querying for the latest block
    getLatestBlock(){
        return this.chain[this.chain.length - 1];

    }

    pushNewBlock(block){
        this.chain.push(block);
    }


    // Verifying whole chain
    verifyChain(){
        for(let i = 2; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];


            if(currentBlock.hash !== currentBlock.calculateHashTransaction()){
                return false;
            }

            if(currentBlock.PreviousHash !== previousBlock.hash){
                return false;
            }
        return true;
            }   
    }

    // Because of block structure, transactions are first added to an array of pending transactions.
    addTransactionsToPendingTransactions(transaction){
        this.pendingTransactions.push(transaction)
        let transactionNumber = this.pendingTransactions.length;
        let blockNumber = this.chain.length;
        console.log("Added Transaction " + transactionNumber + " to Block " + blockNumber + " -> unconfirmed");
        
        // When enough transactions, they are sent to the mine method
        if(this.pendingTransactions.length >= this.maxPendingTransactions){
            this.minePendingTransactions(this.pendingTransactions);
        }
    }

    // Method for mining
    minePendingTransactions(transactions){
        let newBlock = new Block("10/19/12", transactions);
        newBlock.previousHash = this.getLatestBlock().hash;

        // Generate Hashes of transactions
        for(let i = 0; i <= transactions.length - 1; i++ ){
        newBlock.transactions[i].hash = newBlock.calculateHashTransaction(transactions[i]);
        }

        // Generating Block Hash using Transaction hashes
        newBlock.hash = newBlock.mineBlock(transactions, this.difficulty);

        this.pushNewBlock(newBlock);

        // Because they are written to the blockchain, the pending transactions are wiped
            this.pendingTransactions = [];
    }

    
    

// Methods for querying the chain

    // Querying for specific make
    queryMake(make){
        for(let i = 0; i < this.chain.length; i++){
            if(this.chain[i].data.make == make){
                console.log(this.chain[i].data);
            } 
        }
    }

    queryModel(model){
        for(let i = 0; i < this.chain.length; i++){
            if(this.chain[i].data.model == model){
                console.log(this.chain[i].data);
            } 
        }
    }
}





let businessBlockchain = new Blockchain();

businessBlockchain.addTransactionsToPendingTransactions(new Transaction('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model S' }));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('19/04/2018', { 'make' : 'BMW' , 'model' : 'M2 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('19/04/2018', { 'make' : 'BMW' , 'model' : 'M3 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model X' }));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model S' }));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('19/04/2018', { 'make' : 'BMW' , 'model' : 'M2 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('19/04/2018', { 'make' : 'BMW' , 'model' : 'M3 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Transaction('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model X' }))



console.log(JSON.stringify(businessBlockchain, null, 3));
