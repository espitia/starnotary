pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 { 

    struct Star { 
        string name; 
        string dec;
        string mag;
        string cent;
        string story;
        string hashOfCoordinates;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; // [tokenId] => Star
    mapping(uint256 => uint256) public starsForSale; // [tokenId] => price


    function createStar(string _name, string _dec, string _mag, string _cent, string _story) public { 
        // get sha256 of coordinates for uniqueness
        bytes32 bytes32HashOfCoordinates = sha256(abi.encodePacked(_dec, _mag, _cent));
        // get string type of hash to save to Star
        string memory hashOfCoordinates = toAsciiStringFromBytes32(bytes32HashOfCoordinates);
        // create new Star
        Star memory newStar = Star(_name, _dec, _mag, _cent, _story, hashOfCoordinates);
        // get uint256 type of hash to save as tokenId (ERC721 tokenId must be of type uint256)
        uint256 tokenId = stringToUint(hashOfCoordinates);

        tokenIdToStarInfo[tokenId] = newStar;

        _mint(msg.sender, tokenId);

    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }


    function checkIfStarExist(string _dec, string _mag, string _cent) public view returns (bool) {
        uint256 tokenId = uint256HashFromCoordinates(_dec, _mag, _cent);
        Star memory s = tokenIdToStarInfo[tokenId];

        bytes memory tempEmptyStringTest = bytes(s.name); // Uses memory
        if (tempEmptyStringTest.length == 0) {
            return false;
        } else {
            return true;
        }
    }


    /**
    Utilities
     */
    function uint256HashFromCoordinates(string _dec, string _mag, string _cent) internal pure returns (uint256) {
        bytes32 bytes32HashOfCoordinates = sha256(abi.encodePacked(_dec, _mag, _cent));
        string memory hashOfCoordinates = toAsciiStringFromBytes32(bytes32HashOfCoordinates);
        return stringToUint(hashOfCoordinates);
    }

    function toAsciiStringFromBytes32(bytes32 data) internal pure returns (string) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(data) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(byte b) internal  pure returns (byte c) {
        if (b < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }

    function stringToUint(string s) internal pure returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }
}