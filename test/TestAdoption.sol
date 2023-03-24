pragma solidity 0.5.16;

import 'truffle/Assert.sol';
import 'truffle/DeployedAddresses.sol';
import '../contracts/Adoption.sol';

contract TestAdoption {
	Adoption adoption = Adoption(DeployedAddresses.Adoption());
	uint expectedPetId = 8;
	address expectedAdopter = address(this);
	
	function testUserCanAdoptPet() public {
		uint returnedId=adoption.adopt(expectedPetId);
		Assert.equal(returnedId,expectedPetId,'Failure');
	}

	function testGetAdopterAddressByPetId() public {
		address adopter = adoption.adopters(expectedPetId);
		Assert.equal(adopter,expectedAdopter,'Owner Failure');
	}
}
