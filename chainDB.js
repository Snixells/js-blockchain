const levelup = require('levelup');
const leveldown = require('leveldown');

var db = levelup(leveldown("./chaindb"));

// db.put('name', 'testName', (err) => {
//     if(err){
//         return console.log("Ooops!, Some Error Occured!: " + err);
//     }
// })

db.get('name', (err, value) => {
    if(err){
        return console.log("Error: " + err);
    }

    console.log("name= " + value);
})