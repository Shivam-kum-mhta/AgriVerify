// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriVerify {
    struct Crop {
        uint256 cropId;
        string name;
        uint256 timestamp;
        bool certified;
    }

    uint256 public cropIdCounter = 0;

    // Map an address to an array of crops
    mapping(address => Crop[]) public crops;

    event CropCertified(address indexed farmer, string cropName, uint256 cropId);

    function submitCertification(string calldata _cropName) public {
        cropIdCounter++;

        crops[msg.sender].push(Crop({
            cropId: cropIdCounter,
            name: _cropName,
            timestamp: block.timestamp,
            certified: true   // Initially, the crop is not certified
        }));

        emit CropCertified(msg.sender, _cropName, cropIdCounter);
    }


    function getCropInfo(address farmer) public view returns (Crop[] memory) {
        return crops[farmer];
    }


}
