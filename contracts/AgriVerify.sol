// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriVerify {
    struct Crop {
        string name;
        string farmName;
        string location;
        bool certified;
    }

    mapping(address => Crop) public crops;

    event CropCertified(address indexed farmer, string cropName);

    function submitCertification(
        string calldata _cropName,
        string calldata _farmName,
        string calldata _location
    ) public {
        // Memory efficiency for certification
        crops[msg.sender] = Crop({
            name: _cropName,
            farmName: _farmName,
            location: _location,
            certified: true
        });

        emit CropCertified(msg.sender, _cropName);
    }

    function getCropInfo(address farmer) public view returns (Crop memory) {
        return crops[farmer];
    }
}
