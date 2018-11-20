# Star Notary

Mint non-fungible Star tokens using the ERC721 standard. Contract is deployed to the Rinkeby network: [0x54a541b45ef7c2b718691f6df1cd53b3fb7e752a](https://rinkeby.etherscan.io/address/0x54a541b45ef7c2b718691f6df1cd53b3fb7e752a). Project includes:
* StarNotary smart contract to manage tokens
* Front-end to interact with smart contract
* RESTful API to look up star information

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

The project uses the following libraries:

```
    "express": "^4.16.4",
    "openzeppelin-solidity": "2.0.0-rc.1",
    "truffle-hdwallet-provider": "0.0.6",
    "web3": "^1.0.0-beta.36"
```

### Installing

To install the dependencies, inside the `smart_contracts` directory:

```
npm install
```

## Interact with the contract

To interact with the contract, run the following command in the root directory:

```
http-server
```

Then, navigate to your local host on port `8080`

```
http://localhost:8080/
```

To run the RESTful API, cd to the `libs` folder and run:

```
node api.js
```
Then, you can call the API using the endpoint below:

## RESTful API endpoints

To see star information:

```
GET /star/:starId
```

## Running the tests

To run smart contract unit tests:

First, run a local blockchain using [ganache](https://truffleframework.com/ganache). 

Then, cd to the `smart_contracts` folder and run:

```
truffle test
```

Tests are broken down to four categories:

* creating stars
* buying and selling of stars
* managing ownership of stars
* core ERC721 functions

## Built With

* [Truffle](http://truffleframework.com/) - Tools to develop smart contracts
* [Zeppelin](https://openzeppelin.org/) -  Framework of reusable smart contracts for Ethereum 

## Author

**German Espitia** - [espitia7](https://espitia7)
