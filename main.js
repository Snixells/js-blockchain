const Blockchain = require('./Blockchain.js');
const Transaction = require('./Transaction.js');
const Block = require('./Block.js');


let businessBlockchain = new Blockchain();

businessBlockchain.addCar("Tesla", "Model 3");
businessBlockchain.addCar("BMW", "M2 Coupe");
businessBlockchain.addCar("Tesla", "Model X");
businessBlockchain.addCar("Tesla", "Model S");
businessBlockchain.addCar("BMW", "M4 Coupe");
businessBlockchain.addCar("Tesla", "Model 3");
businessBlockchain.addCar("BMW", "M2 Coupe");
businessBlockchain.addCar("Tesla", "Model X");
businessBlockchain.addCar("Tesla", "Model S");
businessBlockchain.addCar("BMW", "M4 Coupe");

console.log(JSON.stringify(businessBlockchain, null, 3));
