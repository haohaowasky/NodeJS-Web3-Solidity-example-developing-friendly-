const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// express
var express = require('express');
var todocontroller = require('./controllers/appcontroller');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));


// compile the code
const input = fs.readFileSync('./contract/test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':test'].bytecode;
const abi = JSON.parse(output.contracts[':test'].interface);

// Contract object
web3.eth.getAccounts();
var contract = new web3.eth.Contract(abi);
contract.options.data = '0x' + bytecode;
// deploy

web3.eth.getAccounts(function(error, accounts) { // get the accounts
    deployment(accounts);
});

function deployment(accounts){
    contract.deploy({
        arguments: []}

        ).send({
        from: accounts[0], // change it while refresh the testrpc
        gas: 1500000,
    }).then(function(newContractInstance){
        console.log(newContractInstance.options.address);
        var addr = newContractInstance.options.address;
        todocontroller(app, addr, accounts);
    });
}
app.listen(3000);
console.log('You are listening to port 3000');
