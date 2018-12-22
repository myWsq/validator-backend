pragma solidity ^0.5.0;

contract Information {
    mapping (string => string) information;

    constructor() public {}

    function setInfo(string memory username, string memory info) public returns(bool) {
        information[username] = info;
        return true;
    }

    function getInfo(string memory username) public view returns(string memory){
        return information[username];
    }
}