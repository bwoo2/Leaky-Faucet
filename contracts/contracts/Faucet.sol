// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.9.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "Aqua";
    string public constant symbol = "H2O";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
    balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


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
