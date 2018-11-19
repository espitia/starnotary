# Star Notary

Mint non-fungible Star tokens using the ERC721 standard. Contact is deployed to the Rinkeby network: [0x54a541b45ef7c2b718691f6df1cd53b3fb7e752a](https://rinkeby.etherscan.io/address/0x54a541b45ef7c2b718691f6df1cd53b3fb7e752a). Project includes:
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

To install the dependencies:

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

To run the RESTful API:

```
node api.js
```

## RESTful API endpoints

To see star information:

```
GET: /star/:starId
```

## Running the tests

To run smart contract unit tests, cd to the `smart_contracts_ folder and run:

```
truffle test
```

### Break down into end to end tests

Tests are broken down to four categories:

* creating stars
* buying and selling of stars
* managing ownership of stars
* core ERC721 functions

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Truffle](http://truffleframework.com/) - The tools to develop smart contracts
* [Zeppelin](https://openzeppelin.org/) -  Framework of reusable smart contracts for Ethereum 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **German Espitia** - [espitia7](https://espitia7)

## Built for

* Udacity Blockchain Nanodegree