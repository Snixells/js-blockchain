const SHA256 = require('crypto-js/sha256');

// Class for the Blocks the Chain will consist of later
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // Calculating Hash
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }

    // Including poW -> specific number of zeros at beginning of hash 
    mineBlock(difficulty){
       while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
           this.nonce += 1;
           this.hash = this.calculateHash();
       }

       console.log("After " + this.nonce + " Successfull! -> Block Hash: " + this.hash);

       return this.hash;
    }


}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
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

    // Adding new Block to the chain
    addBLock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
console.log("First Block...");
businessBlockchain.addBLock(new Block(1, '18/03/2018', { 'make' : 'Tesla', 'model' : 'Model S' }));
console.log("Second Block...");
businessBlockchain.addBLock(new Block(2, '19/04/2018', { 'make' : 'BMW' , 'model' : 'M2 Coupe'}));
console.log("Third Block");
businessBlockchain.addBLock(new Block(3, '19/04/2018', { 'make' : 'BMW' , 'model' : 'M3 Coupe'}));
console.log("Fourth Block");
businessBlockchain.addBLock(new Block(businessBlockchain.chain.length, '18/03/2018', { 'make' : 'Tesla', 'model' : 'Model X' }))

console.log("Is chain valid ? " + businessBlockchain.verifyChain());

console.log(JSON.stringify(businessBlockchain, null, 3));

businessBlockchain.queryModel("M2 Coupe");
