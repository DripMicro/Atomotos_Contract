pragma solidity ^0.7.6;

contract Protect {
    address payable public protectaddress;
    bool public protect = true;

    constructor(){

    }

    function updateProtect(address payable protectadr) public {
        require(protect == true, "set protected");
        protectaddress = protectadr;
        protect = false;
    }
}