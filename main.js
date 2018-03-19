const SHA256 = require('crypto-js/sha256');


// Class for the Transaction 
class Transaction{
    constructor(data){
        this.data = data;
    }
}

// Class for the Blocks the Chain will consist of later
class Block{
    constructor(timestamp, data, previousHash = ''){
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // Calculating Hash
    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }

    // Including poW -> specific number of zeros at beginning of hash 
    mineBlock(difficulty){
       while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
           this.nonce += 1;
           this.hash = this.calculateHash();
       }

    //    console.log("After " + this.nonce + " Successfull! -> Block Hash: " + this.hash);
       console.log("Mining Transaction; Hash -> " + this.hash + " After " + this.nonce + " calculations")

       return this.hash;
    }

}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 10;
        this.maxPendingTransactions = 3;
    }

    // Creating the first (genesis) block
    createGenesisBlock(){
        return new Block("17/03/2018", "GenesisBlock", 0, "");
    }

    // Querying for the latest block
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    // Verifying whole chain
    verifyChain(){
        for(let i = 2; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];


            if(currentBlock.hash !== currentBlock.calculateHash()){
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
        let transactionNumber = this.pendingTransactions.length + this.chain.length - 1;
        console.log("Added Transaction " + transactionNumber + " to pending Transactions");

        // The transactions are sent to the mining method
        this.minePendingTransactions(this.pendingTransactions);
    }

    // Method for mining
    minePendingTransactions(transactions){
        // If enough transactions are collected, they are being mined
        if(transactions.length >= this.maxPendingTransactions){
            for(let i = 0; i <= transactions.length - 1; i++){
                let newBlock = transactions[i];
                newBlock.previousHash = this.getLatestBlock().hash;
                newBlock.hash = newBlock.mineBlock(this.difficulty);
                this.chain.push(newBlock);
            } 

            // Cause they are mined, the pending transactions array is being wiped
            this.pendingTransactions = [];
        }
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

businessBlockchain.addTransactionsToPendingTransactions(new Block('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model S' }));
businessBlockchain.addTransactionsToPendingTransactions(new Block('19/04/2018', { 'make' : 'BMW' , 'model' : 'M2 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Block('19/04/2018', { 'make' : 'BMW' , 'model' : 'M3 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Block('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model X' }))
businessBlockchain.addTransactionsToPendingTransactions(new Block('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model S' }));
businessBlockchain.addTransactionsToPendingTransactions(new Block('19/04/2018', { 'make' : 'BMW' , 'model' : 'M2 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Block('19/04/2018', { 'make' : 'BMW' , 'model' : 'M3 Coupe'}));
businessBlockchain.addTransactionsToPendingTransactions(new Block('18/03/2018', { 'make' : 'Tesla', 'model' : 'Model X' }))



// console.log(JSON.stringify(businessBlockchain, null, 3));
