// Class for the Transaction 

const SHA256 = require('crypto-js/sha256');


class Transaction {
    
    constructor(data) {
        this.data = data;
        this.timestamp = this.getDate();
        this.hash = this.calculateHash();
        console.log(this.hash);
    }

    getDate(){
        let timestamp = new Date();
        let dd = timestamp.getDate();
        let mm = timestamp.getMonth()+1;
        let yyyy = timestamp.getFullYear();
        let hh = timestamp.getHours();
        let ss = timestamp.getSeconds();
        let ms = timestamp.getMilliseconds();
        
        if(dd<10)
            dd = '0' + dd
        
        if(mm<10) 
            mm = '0' + mm

        if(hh<10)
            hh = '0' + mm

        if(ss<10)
            ss = '0' + ss

        if(ms<10)
            ms = '000' + ms;

        if(ms<100)
            ms = '00' + ms;

        if(ms<1000)
            ms = '0' + ms;

        return yyyy + '/' + mm + '/' + dd + '/' + hh + '/' + ss +'/' + ms;
    }

    calculateHash(){
        return SHA256(this.timestamp + JSON.stringify(this.data)).toString();
    }
}

module.exports = Transaction;