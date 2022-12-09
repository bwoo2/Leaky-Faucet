let idToAddress = {};
let address = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
let contracts = {};
let locationChosen = '';
let donationAmount = 0;
let locations = {};
let id = 0;
let web3Provider = null;
let url = 'http://127.0.0.1:7545';
let abi = 
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenOwner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];


function init() {
  console.log("yessuh1");
    $.getJSON('../locations.json', function(data) {
        for (let i = 0; i < data.length; i++) {
            idToAddress[data[i].name] = data[i].address;
        }
    });
    return initWeb3();
}

function initWeb3() { 
  console.log("yessuh3");
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } 
    else { 
        web3Provider = new Web3.providers.HttpProvider(url);
    } 

    web3 = new Web3(web3Provider);

    ethereum.enable();

    populateAddress();
    return initContract();
}


function initContract() {
    //contracts.Faucet = web3.eth.contract(abi,"0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8");
    $.getJSON('Faucet.json', function(data) {
         var initializeWallet = data;
         contracts.Faucet = TruffleContract(initializeWallet);

         contracts.Faucet.setProvider(web3Provider);

        return populateAddress();
    });
}

// code taken from ballet-app to connect to metamask automatically when page is clicked on
function populateAddress() {
    console.log("neva")
    new Web3(new Web3.providers.HttpProvider(url)).eth.getAccounts((err, accounts) => {
        web3.eth.defaultAccount = web3.eth.accounts[0]
            jQuery.each(accounts,function(i){
                if(web3.eth.coinbase != accounts[i]){
                    var optionElement = '<option value="' + accounts[i] + '">' + accounts[i] + '</option';
                    jQuery('#enter_address').append(optionElement);  
                }
            });
        });
    }


function bindEvents() {
  console.log("yessuh");
  handleLocation();
  handleAmount();
  handleDonation();
  /*
    $(document).ready(function () {
        $('#location').on('click', handleLocation);
    });
    $(document).ready(function () {
        $('#amount').on('click', handleAmount);
    });
    $(document).on('click', '#donation', handleDonation);
    */
}

/*
function transferToken(){
    var sent = 
}
*/
function handleLocation() {
    locationChosen = document.getElementById('location').value; // saves location
    if(locationChosen == "Eritrea"){
        id = 0;
    } else if(locationChosen == "Papua New Guinea"){
        id = 1;
    } else if(locationChosen == "Uganda"){
        id = 2;
    } else if(locationChosen == "Ethopia"){
        id = 3;
    } else if(locationChosen == "Somalia"){
        id = 4;
    } else if(locationChosen == "Amogla"){
        id = 5;
    } else if(locationChosen == "Congo"){
        id = 6;
    } else if(locationChosen == "Chad"){
        id = 7;
    } else if(locationChosen == "Niger"){
        id = 8;
    } else if(locationChosen == "Muzambique"){
        id = 9;
    }
    console.log(id);
}


function handleAmount() {
    donationAmount = document.getElementById('amount').value;
    contracts.Faucet(donationAmount); // saves donation amount
}


async function handleDonation() {
    if (donationAmount == '' && locationChosen == '') {
        error.textContent = "Please select a location and an amount to donate"
        error.style.color = "red"
    }
    else if (donationAmount != '' && locationChosen == '') {
        error.textContent = "Please select a location OR ensure that you spelt the country correctly"
        error.style.color = "red"
    }
    else if (locationChosen in idToAddress) {
        if (donationAmount != '' && locationChosen != '') {
            // error.textContent = locationChosen + ' appreciates your donation of $' + donationAmount.toString()
            // error.style.color = "white"
            alert(locationChosen + ' appreciates your donation of $' + donationAmount.toString());
        }
        else if (donationAmount == '' && locationChosen != '') {
            error.textContent = "Please select a donation amount"
            error.style.color = "red"
        }
    }
    else {
        error.textContent = "We couldn't find that country in our database, please try again :("
        error.style.color = "red"
    } 

    contracts.Faucet.mentods.getAmount().send({from:web3.eth.defaultAccount});
   // var contract = web3.eth.contract(abi,"0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"); //deployed address
    //var version = web3.version.api;

    //var sent = await contract.methods.getAmount();
    //var sent = await contract.methods.populateCountries(id).send({from:web3.eth.defaultAccount});
    //console.log(sent);
}