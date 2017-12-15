const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const input = fs.readFileSync('./contract/test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':test'].bytecode;
const abi = JSON.parse(output.contracts[':test'].interface);
// json
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
// Contract object



var data = [{item: 100}, {item: 200}];


module.exports = function(app, contract_address, accounts) {
  console.log('contract running at: ', contract_address);
  // console.log("this is it : " + accounts[2]);

  var MyContract = new web3.eth.Contract(abi, contract_address);
  var num = 1;
  app.get('/todo', function(req, res){
      res.render('todo', {todos: data});
    });

  app.post('/todo',urlencodedParser,  function(req, res){ // get data from the view and add it to mongo

          // data.push(req.body) // used to
          data.push(req.body);
          num+=1;
          console.log(data[num].item);
          res.json(data);
          MyContract.methods.Adddata(data[num].item,num).call({from: accounts[1]}, function(error, result){
               console.log(result);}
      )});
}




















// web3.eth.getTransactionReceiptMined = require("getTransactionReceiptMined.js");
//
// it("should transfer coins", function() {
//
//   let meta;
//   const account_one = accounts[0];
//   const account_two = accounts[1];
//
//   return MetaCoin.deployed()
//     .then(function (instance) {
//       meta = instance;
//       return meta.sendCoin.call(account_two, 6, { from: account_one });
//     })
//     .then(function (sufficient) {
//       if (!sufficient) {
//         throw "Insufficient coins";
//       }
//       return meta.sendCoin.sendTransaction(account_two, 6, { from: account_one });
//     })
//     .then(function (txHash) {
//       return web3.eth.getTransactionReceiptMined(txHash);
//     })
//     .then(function (receipt) {
//       assert.strictEqual(receipt.logs.length, 1, "Should have emitted an event");
//       return meta.getBalance.call(account_two);
//     })
//     .then(function (balance) {
//       assert.strictEqual(balance.toNumber(), 6, "Should have received 6 coins");
//     });
//
// });
