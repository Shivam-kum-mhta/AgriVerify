// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriVerify {
    struct Crop {
        string name;
        string farmName;
        string location;
        bool certified;
    }

    address public owner;
    mapping(address => Crop) public crops;

    event CropCertified(address indexed farmer, string cropName);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function submitCertification(
        string memory _cropName,
        string memory _farmName,
        string memory _location
    ) public {
        Crop memory newCrop = Crop({
            name: _cropName,
            farmName: _farmName,
            location: _location,
            certified: true
        });

        crops[msg.sender] = newCrop;
        emit CropCertified(msg.sender, _cropName);
    }

    function getCropInfo(address farmer) public view returns (Crop memory) {
        return crops[farmer];
    }
}
