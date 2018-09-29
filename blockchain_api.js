// import express
const express = require('express');
const app = express();
const port = 8000;

// import blockchain functionality
const bc = require('./bc');
const Block = bc.Block;
const Blockchain = bc.Blockchain;

// import body-parser
const bodyParser = require('body-parser');

// Bodyparser Middleware
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(bodyParser.json())

// set up the blockchain
let blockchain = new Blockchain();

// get block
app.get('/block/:x', (req, res) => {
  if(req.params.x)
  blockchain.getBlock(req.params.x)
    .then(block => {
      res.send(block);
    })
})

// add block POST request. Use [key = block] and [value = desired block body]
// the request should be urlencoded
app.post('/block', (req, res) => {
  if (!req.body.block) {
    res.send('No block body provided for block')
  } 
  else if (typeof req.body.block === 'string'){
    blockchain.addBlock(new Block(req.body.block));
    res.send(`new block added to the blockchain`);
  } 
  else {
    res.send('The block value needs to be a string');
  }
})

app.get('/blockheight', (req, res) => {
  blockchain.getBlockHeight()
    .then(height => {
      res.send(height);
    })
})

// Validate chain
app.get('/validate', (req, res) => {
  blockchain.validateChain()
  .then(result => {
    res.send(result);
  })
})

// add fakeblock
app.post('/fake', (req, res) => {
  blockchain.fakeBlock(new Block(req.body.block), req.body.height);
  res.send('faked');
})

// start server
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
