// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NFT {
	address[16] public buyers;
	
	function buy(uint nftId) public returns (uint) {
		require(nftId>=0 && nftId<=15);
		buyers[nftId]=msg.sender; 
		return nftId;
	}

	function getBuyers() public view returns(address[16] memory) {
		return buyers;
	}
}
