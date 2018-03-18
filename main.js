const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

        miningDifficulty(){
        while(correctHash != true){
            hash = this.calculateHash();
            for(let i = 0; i<miningDifficultyNumber; i++){
                if(hash[i] != 0){
                    break;
                }
            }
            correctHash = true;
        }
    }


}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block("17/03/2018", "GenesisBlock", 0, "");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    verifyBlocks(){
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

    addBLock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        // if (businessBlockchain.verifyBlocks() == false){
        //     // throw "BLOCKCHAIN SECURITY DAMAGED";
        //     console.log("BLockchain security damaged");
        // }



    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let businessBlockchain = new Blockchain();
businessBlockchain.addBLock(new Block(1, '18/03/2018', { 'make' : 'Tesla', 'model' : 'Model S' }));
businessBlockchain.addBLock(new Block(2, '19/04/2018', { 'make' : 'BMW' , 'model' : 'M2 Coupe'}));
businessBlockchain.addBLock(new Block(3, '19/04/2018', { 'make' : 'BMW' , 'model' : 'M3 Coupe'}));

businessBlockchain.addBLock(new Block(businessBlockchain.chain.length, '18/03/2018', { 'make' : 'Tesla', 'model' : 'Model X' }))

console.log("Is chain valid ? " + businessBlockchain.isChainValid());

console.log(JSON.stringify(businessBlockchain, null, 3));
