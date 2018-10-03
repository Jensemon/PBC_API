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
app.get('/block/:height', (req, res) => {

  // check current blockheight and see if within bounds
  blockchain.getBlockHeight()
    .then(blockHeight => {
      // convert strings to integers
      let requestedHeight = parseInt(req.params.height);
      let currentHeight = parseInt(blockHeight);

      if (requestedHeight > 0 && requestedHeight <= currentHeight) {
        blockchain.getBlock(req.params.height)
          .then(block => {
            res.send(block);
          })
      }
      // if out of bounds return a 404
      else {
        res.status(404).send('Block not found')
      }
    })


  // // Error handling at the blockchain level, does not send a 404.
  // if(req.params.height) {
  //   blockchain.getBlock(req.params.height)
  //   .then(block => {
  //     res.send(block);
  //   })
  // }
})

// add block POST request. Use [key = block] and [value = desired block body]
// the request should be urlencoded
app.post('/block', (req, res) => {
  if (!req.body.block) {
    res.send('No block body provided for block')
  } 
  else if (typeof req.body.block === 'string'){
    blockchain.addBlock(new Block(req.body.block));
    // Allows the database half a second to add block then returns the added block as JSON string.
    setTimeout(() => {
      blockchain.getBlockHeight()
        .then(value => {
          blockchain.getBlock(value)
            .then((block) => {
              res.send(JSON.stringify(block));
            })
        })
    }, 500);
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
  if (req.body.block && req.body.height){
    blockchain.fakeBlock(new Block(req.body.block), req.body.height);
    res.send('faked');
  }
  else {
    res.send(`You need to provide 'block' and 'height' to fake a block`);
  }
})

// start server
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
