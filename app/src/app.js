let idToAddress = {};
let contracts = {};
let locationChosen = '';
let donationAmount = 0;
let web3Provider = null;
let url = 'http://127.0.0.1:7545';


function init() {
  console.log("yessuh1");
    $.getJSON('../locations.json', function(data) {
        for (let i = 0; i < data.length; i++) {
            idToAddress[data[i].name] = data[i].address;
        }
    });
    console.log("yessuh2");
    return initWeb3();
}

function initWeb3() { 
  console.log("yessuh3");
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } 
    else { 
        web3Provider = new Web3.providers.HttpProvider(App.url);
    } 

    web3 = new Web3(web3Provider);

    ethereum.enable();
    
    return initContract();
}


function initContract() {
    $.getJSON('Faucet.json', function(data) {

        // ! cannot connect to smart contract
        // const initializeWallet = data;
        // contract.locationSelection = TruffleContract(initializeWallet);
        // contract.locationSelection.setProvider(web3Provider);

        return populateAddress();
    });
}

// code taken from ballet-app to connect to metamask automatically when page is clicked on
function populateAddress() {
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


function handleLocation() {
    locationChosen = document.getElementById('location').value; // saves location
}


function handleAmount() {
    donationAmount = document.getElementById('amount').value; // saves donation amount
}


function handleDonation() {
    console.log(locationChosen);
    console.log(donationAmount);
    console.log(idToAddress);
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

}