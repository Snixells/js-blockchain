const Blockchain = require('./Blockchain.js');
const Transaction = require('./Transaction.js');
const Block = require('./Block.js');

let businessBlockchain = new Blockchain();

businessBlockchain.addCar("addToSystem", "1", "Tesla", "Model 3", "0001");
businessBlockchain.addCar("addToSystem", "1", "BMW", "M2 Coupe", "0002");
businessBlockchain.addCar("addToSystem", "2", "Tesla", "Model X", "0003");
businessBlockchain.addCar("addToSystem", "2", "Tesla", "Model S", "0004");
businessBlockchain.addCar("addToSystem", "2", "BMW", "M4 Coupe", "0005");
businessBlockchain.addCar("addToSystem", "1", "Tesla", "Model 3", "0006");
businessBlockchain.addCar("addToSystem", "1", "BMW", "M2 Coupe", "0007");
businessBlockchain.addCar("addToSystem", "2", "Tesla", "Model X", "0008");
businessBlockchain.addCar("addToSystem", "1", "Tesla", "Model S", "0009");
businessBlockchain.addCar("addToSystem", "2", "BMW", "M4 Coupe", "0010");
businessBlockchain.addCar("addToSystem", "2", "Tesla", "Model X", "0008");
businessBlockchain.addCar("1", "2", "Tesla", "Model 3", "0006");

businessBlockchain.queryCarID("0006");
console.log(JSON.stringify(businessBlockchain, null, 3));