const Blockchain = require('./Blockchain.js');
const Transaction = require('./Transaction.js');
const Block = require('./Block.js');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';


let businessBlockchain = new Blockchain();

businessBlockchain.addCar("1", "Tesla", "Model 3", "0001");
businessBlockchain.addCar("1", "BMW", "M2 Coupe", "0002");
businessBlockchain.addCar("2", "Tesla", "Model X", "0003");
businessBlockchain.addCar("2", "Tesla", "Model S", "0004");
businessBlockchain.addCar("2", "BMW", "M4 Coupe", "0005");
businessBlockchain.addCar("1", "Tesla", "Model 3", "0006");
businessBlockchain.addCar("1", "BMW", "M2 Coupe", "0007");
businessBlockchain.addCar("2", "Tesla", "Model X", "0008");
businessBlockchain.addCar("1", "Tesla", "Model S", "0009");
businessBlockchain.addCar("2", "BMW", "M4 Coupe", "0010");
businessBlockchain.addCar("2", "Tesla", "Model X", "0008");
businessBlockchain.addCar("2", "Tesla", "Model 3", "0006");

let queryResults = businessBlockchain.queryCarID("0007");
businessBlockchain.printQueryResults(queryResults);
console.log("1. was chosen");
businessBlockchain.transferCar("2", businessBlockchain.chooseQueryResult(1, queryResults));

console.log(businessBlockchain.getOwnerFindByCarID("0006"));

// console.log(JSON.stringify(businessBlockchain, null, 3));