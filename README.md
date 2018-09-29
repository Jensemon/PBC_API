# PBC_API
Private Blockchain RESTful API for Udacity

## Getting Started

Make sure you have node installed. 

Once you have cloned the project you should be able to simply run the project from its working directory using 
```
node blockchain_api.js`
```
The first time you run the application you'll see a warning in the console telling you `Block height not found, create new genesis block...` and further that block 0 was added to the chain.

The blockchain has now been initialized and is ready to use at:
```
localhost:8000
```
Note that data persists, so you should only get the warning the first time you start the application, after that a genesis block will be found and no block will be added at startup.

## Endpoint Documentation

Following is a list of endpoints and how to use them

### Get Block
To retrieve a block at block hight `x` send a GET request to 
```
localhost:8000/block/x
```
The blockchain is 0-indexed so `localhost:8000/block/0` will retrieve the genesis block. Non-integers and numbers larger than the current block height will return an error.

### Get Blockheight
A GET request to
```
localhost:8000/blockheight
```
returns the height of the blockchain. Note that the blockchain is 0-indexed and that the height is the current index, it is not representative of the number of blocks in the chain.

### Add Block
To add a block you need to make a POST request using a key and a value. The key needs to be `block` while the value needs to be a non empty string, and will become the body of the added block. The POST request should be made to:

```
localhost:8000/block
```
Note that the POST request needs to be urlencoded.

### Validate Blockchain
A GET request to 
```
localhost:8000/validate
```
will try to validate the blockchain. 

If it's validated it will return a message saying `Blockchain was successfully validated`

Otherwise the message reads `Errors found on these blocks: x,y,z` where x,y,z is the blockheight of the blocks that couldn't validate.

### Add Corrupt Block (for testing)
For testing purposes an endpoint is provided to create corrupt blocks. This endpoint should be removed if the project is used. 

To add a corrupt block make a POST request to
```
localhost:8000/fake
```
and provide key value pairs for the keys `block` and `height`. 

The value for `block` will be the block body. 

The value for `height` has to be an integer, and determines at what height the corrupt block will be inserted. Height 0 means the genesis block will be replaced with the corrupt block.

Note that the POST request needs to be urlencoded.

