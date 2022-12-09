// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.9.0;
contract Faucet {

    address owner; //deployer address
    //address payable[] countryAddresses; //country addresses for each wallet 
    uint value; //amount user wants to send
    

    constructor(address payable[] memory addresses_) public {
        owner = msg.sender;
        // countryAddresses = addresses_;
        value = 0;
    }

    struct Country {
        uint Wallet;
        uint id;
        address payable currentCountry;
    }

    Country country;
    mapping(uint => Country) public countries;

    function populateCountries(uint id) public returns (uint index){
        if(id == 0){
            countries[id].currentCountry = payable(0xdA9C2a08dfbe45884a3C0D98F3E5C93486b78dD3);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 1){
            countries[id].currentCountry = payable(0x4fD39dA788e988F40a65467cefd8000bfbdE38db);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 2){
            countries[id].currentCountry = payable(0x067446404781187064cEcF933e75c972b9b5fdF0);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 3){
            countries[id].currentCountry = payable(0x07d80AFd56Be11deb92798193860b51711b54213);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 4){
            countries[id].currentCountry = payable(0x47432f243FE438e8505092dD3d3b4c4A775F3e88);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 5){
            countries[id].currentCountry = payable(0xe8aD7553fE29415086842ca17eE1D81d886B6e9a);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 6){
            countries[id].currentCountry = payable(0x903164A2dF153ccb9CD549F03aAb5Dbc8E8AE8C9);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 7){
            countries[id].currentCountry = payable(0xc37bA4643C5d451170289f84045F6bc0C26C79d0);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 8){
            countries[id].currentCountry = payable(0x3188194F9BC101278D67dFc2C5E6F4b63BEBBf00);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        } else if(id == 9){
            countries[id].currentCountry = payable(0xa5766861A73c68fD3741E7808703EF2e97d2D4Ac);
            countries[id].id = id;
            countries[id].Wallet = 0;
            return id;
        }
    }

    function getAmount(uint _amount) public returns (uint){
        return value = _amount;
    }

    function viewUser() public view returns(address){
        return owner;
    }

    function payCountry(uint id) public payable {
        countries[id] = country;
        country.Wallet += value;
        country.currentCountry.transfer(value);
    }

    // function closeContract() public { 
    //     selfdestruct(owner);
    // }

    receive() external payable {}
    
}
