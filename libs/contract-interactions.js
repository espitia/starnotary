
if(typeof web3 != 'undefined') { 
    web3 = new Web3(web3.currentProvider) // what Metamask injected 
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// The default (top) wallet account from a list of test accounts 
web3.eth.defaultAccount = web3.eth.accounts[0];

// The interface definition for your smart contract (the ABI) 
let StarNotary = web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "starsForSale",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenIdToStarInfo",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "dec",
          "type": "string"
        },
        {
          "name": "mag",
          "type": "string"
        },
        {
          "name": "cent",
          "type": "string"
        },
        {
          "name": "story",
          "type": "string"
        },
        {
          "name": "hashOfCoordinates",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_dec",
          "type": "string"
        },
        {
          "name": "_mag",
          "type": "string"
        },
        {
          "name": "_cent",
          "type": "string"
        },
        {
          "name": "_story",
          "type": "string"
        }
      ],
      "name": "createStar",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "putStarUpForSale",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "buyStar",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_dec",
          "type": "string"
        },
        {
          "name": "_mag",
          "type": "string"
        },
        {
          "name": "_cent",
          "type": "string"
        }
      ],
      "name": "checkIfStarExist",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);
// Grab the contract at specified deployed address with the interface defined by the ABI
var starNotary = StarNotary.at('0x54a541B45eF7C2B718691F6Df1CD53b3fb7e752a');

/**
 * WEB3 INTERACTIONS
 */

function lookUpStarByIdClicked() {

  // get input
  starId = document.getElementById('starId').value

  // call contract for star info given starId
  starNotary.tokenIdToStarInfo(starId, (error, result) => {
    if (!error) {
    
        // star info in an array
        let starInfo = result

        // get form 
        lookUpStarByIdForm = document.getElementById('look-up-star-form')

        // if star-info results not yet shown .. create new div to show them
        if (document.getElementsByClassName('star-info').length == 0) {
            
            if (!starInfo[5]) { // if not star info available for given id
                let noStarFoundDiv = noStarFoundStarInfoDiv()
                lookUpStarByIdForm.appendChild(noStarFoundDiv)
            } else { 
                let starInfoDiv = createStarInfoDiv(starInfo) // create it
                lookUpStarByIdForm.appendChild(starInfoDiv) // show it      
            } 
        } else { // if star-info results are already shown, replace old one

            let oldStarInfoDiv = document.getElementById('star-info') // get old div to replace 

            if (!starInfo[5]) {
                let noStarFoundDiv = noStarFoundStarInfoDiv()
                lookUpStarByIdForm.replaceChild(noStarFoundDiv, oldStarInfoDiv) // replace

            } else {
                let newStarInfoDiv = createStarInfoDiv(starInfo) // create new div for new star info (in case new input was received)
                lookUpStarByIdForm.replaceChild(newStarInfoDiv, oldStarInfoDiv) // replace
            }
        }                
    }
  })
}
function claimStarClicked() {

  if (!checkIfMetaMaskIsActive()) return;

  let name = document.getElementById('name')
  let story = document.getElementById('story')
  let dec = document.getElementById('dec')
  let mag = document.getElementById('mag')
  let cent = document.getElementById('cent')

  let claimStarForm = document.getElementById('claim-star-form')
  let inputs = [name, story, dec, mag, cent]

  // check if inputs are empty, if so, alert user and stop function
  checkInputsForValidation(inputs)
    // if all inputs are filled, check if star exsist already -> let user know it has already been claimed
    .then(() => { 
      starNotary.checkIfStarExist(dec.value, mag.value, cent.value, (error, exsist) => {
          if (exsist) {
              // let user know star already exsist... check if div already exsist to not create duplicates
              let starAlreadyExsistDiv = createStarAlreadyExsistDiv()
              if (!document.getElementById('star-claim')) {                      
                claimStarForm.appendChild(starAlreadyExsistDiv)
              } else { // if it already exsist, replace it
                let oldStarClaimDiv = document.getElementById('star-claim')
                claimStarForm.replaceChild(starAlreadyExsistDiv, oldStarClaimDiv)
              }
          } else { 
            // let user know star has been created!
            starNotary.createStar(name.value, dec.value, mag.value, cent.value, story.value, {from: web3.eth.accounts[0]}, (error, result) => {
                if (!error)  {

                    // show loading text..
                    let waitingForTransactionToCompleteDiv = createwaitingForTransactionToCompleteDiv()
                    
                    // check if div to show "waiting for transaction" already exsist, if it does, replace, if yes, create it
                    if (document.getElementsByClassName('star-claim').length == 0) {
                        claimStarForm.appendChild(waitingForTransactionToCompleteDiv)
                    } else {
                      let oldStarClaimDiv = document.getElementById('star-claim')
                      claimStarForm.replaceChild(waitingForTransactionToCompleteDiv, oldStarClaimDiv)                            
                    }

                    // watch for transfer event to confirm that the star has been minted
                    let tokenMintedEvent = starNotary.Transfer()
                    tokenMintedEvent.watch((error, result) => {
                          if (!error) {
                            let oldStarClaimDiv = document.getElementById('star-claim')
                            let starClaimedDiv = createStarClaimedDiv(inputs, result)
                            // show user information
                            claimStarForm.replaceChild(starClaimedDiv, oldStarClaimDiv)

                          } else {
                              // notify that there was an error with mintning
                          }
                    })
                    
                }  else {
                  console.log('error checking inputs')
                }               
            })                
          }
      })
    })
    // validations did not pass
    .catch((error) => {          
        console.log('some inputs are missing...')
    })
}

/**
 * UTILITIES
 */

function checkIfMetaMaskIsActive() {

  if (web3.eth.accounts.length == 0) {
    // add warning 
    addMetaMaskInactiveDiv()
    return false
  } else {
    // remove warning
    removeMetaMaskInactiveDiv()
    return true
  }

}

function addMetaMaskInactiveDiv() {

  // if alret already exsist, don't do anything
  if (document.getElementById('metamask-inactive')) return

  // create alert
  alertDiv = document.createElement('div')
  alertDiv.id = 'metamask-inactive'
  alertDiv.className = 'alert alert-danger'
  let text = document.createTextNode('Please make sure your Metamask account is active.');
  alertDiv.appendChild(text)

  // add alert
  document.getElementById('page-header').appendChild(alertDiv)
}

function removeMetaMaskInactiveDiv() {
  // if alert doesn't exsist, dont do anything
  if (!document.getElementById('metamask-inactive')) return
  // remove alert
  let pageHeaderDiv = document.getElementById('page-header')
  pageHeaderDiv.removeChild(pageHeaderDiv.lastChild)
}

function createStarClaimedDiv(inputs, tx) {
    //create div to place info in
    infoDiv = document.createElement("div");
    infoDiv.className = 'star-claim'     
    infoDiv.id = 'star-claim'     


    let title = document.createElement('h5')
    let titleText = document.createTextNode('STAR CLAIMED!');
    title.appendChild(titleText)
    infoDiv.appendChild(title)
    
    infoDiv.appendChild(document.createElement('br'));
    infoDiv.appendChild(document.createTextNode(`Your unique star token was minted with id:`));
    infoDiv.appendChild(document.createElement('br'));
    
    let tokenIdLink = document.createElement('a');
    let tokenId = tx.args.tokenId.toFixed()
    tokenIdLink.href = `https://rinkeby.etherscan.io/token/0x54a541b45ef7c2b718691f6df1cd53b3fb7e752a?a=${tokenId}`
    tokenIdLink.setAttribute('target','_blank')
    tokenIdLink.appendChild(document.createTextNode(`${tokenId}`));
    infoDiv.appendChild(tokenIdLink)
    
    infoDiv.appendChild(document.createElement('br'));
    infoDiv.appendChild(document.createElement('br'));
    
    infoDiv.appendChild(document.createTextNode(`Your transaction hash is the following:`));
    infoDiv.appendChild(document.createElement('br'));
    let hashLink = document.createElement('a');
    hashLink.href = `https://rinkeby.etherscan.io/tx/${tx.transactionHash}`
    hashLink.appendChild(document.createTextNode(`${tx.transactionHash}`));
    hashLink.setAttribute('target','_blank')
    
    infoDiv.appendChild(hashLink);
    return infoDiv    
}

function createwaitingForTransactionToCompleteDiv() {

    //create div to place info in
    infoDiv = document.createElement("div");
    infoDiv.className = 'star-claim'     
    infoDiv.id = 'star-claim'     

    let loader = document.createElement('div')
    loader.className = 'loader'
    infoDiv.appendChild(loader)

    let title = document.createElement('i')
    title.className = "waiting-for-load-text"
    let titleText = document.createTextNode('Waiting for transaction to be mined');
    title.appendChild(titleText)

    infoDiv.appendChild(title)

    return infoDiv    
}
// inputs are the inputs given by user, tx is the event watched after mining the tx
function createStarAlreadyExsistDiv(inputs, tx) {
    
    //create div to place info in
    infoDiv = document.createElement("div");
    infoDiv.className = 'star-claim'     
    infoDiv.id = 'star-claim'     

    let title = document.createElement('h5')
    let titleText = document.createTextNode('Star has already been claimed!');
    title.appendChild(titleText)

    infoDiv.appendChild(title)

    return infoDiv
 }

function checkInputsForValidation(arrayOfInputs) {
    return new Promise((resolve, reject) => {
        // iterate through inputs
        arrayOfInputs.forEach(input => { 
            // if input is empty, mark as empty
            if (!input.value) {  

                // red box around element
                input.parentElement.className = 'has-error'; 
                
                // change placeholders depending on what type of input to signify empty
                if (input.id == 'story') {  
                    input.placeholder = 'Tell a story!' 
                } else if (input.id == 'name') {
                  input.placeholder = 'Name your star!' 
                } else { 
                  input.placeholder = 'We need coordinates here!' 
                }
                reject(true); 
            } else { // if not empty, remove marks if any
                input.parentElement.className = 'form-group'
            }
        });
        resolve(true);
    })
}
function noStarFoundStarInfoDiv() {

     //create div to place info in
     starInfoDiv = document.createElement("div");
     starInfoDiv.className = 'star-info'     
     starInfoDiv.id = 'star-info'       
    
     let title = document.createElement('h5')
     let titleText = document.createTextNode('No star was found for given Star ID');
     title.appendChild(titleText)

     starInfoDiv.appendChild(title)

     return starInfoDiv
}
function createStarInfoDiv(starInfo) {
    //create div to place info in
    starInfoDiv = document.createElement("div");
    starInfoDiv.className = 'star-info'     
    starInfoDiv.id = 'star-info'       

    let title = document.createElement('h5')
    let titleText = document.createTextNode('Star Info:');
    title.appendChild(titleText)

    starInfoDiv.appendChild(title)
    starInfoDiv.appendChild(document.createTextNode(`Name: `));
    starInfoDiv.appendChild(document.createTextNode(`${starInfo[0]}`));
    starInfoDiv.appendChild(document.createElement('br'));
    starInfoDiv.appendChild(document.createTextNode(`Dec:  `));
    starInfoDiv.appendChild(document.createTextNode(`${starInfo[1]}`));
    starInfoDiv.appendChild(document.createElement('br'));
    starInfoDiv.appendChild(document.createTextNode(`Mag: `));   
    starInfoDiv.appendChild(document.createTextNode(`${starInfo[2]}`));
    starInfoDiv.appendChild(document.createElement('br'));
    starInfoDiv.appendChild(document.createTextNode(`Cent: `));
    starInfoDiv.appendChild(document.createTextNode(`${starInfo[3]}`));
    starInfoDiv.appendChild(document.createElement('br'));
    starInfoDiv.appendChild(document.createTextNode(`Story: `));  
    starInfoDiv.appendChild(document.createTextNode(`${starInfo[4]}`));
    starInfoDiv.appendChild(document.createElement('br'));
    starInfoDiv.appendChild(document.createTextNode(`Token ID: `));
    starInfoDiv.appendChild(document.createTextNode(`${starInfo[5]}`));

    return starInfoDiv
}
