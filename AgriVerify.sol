// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriVerify {
    struct Certification {
        string cropName;
        string farmName;
        // string pincode;
        
        string location;
        uint256 timestamp;
        address farmer;
    }

    event CropCertified(uint256 certId, address indexed farmer, string cropName, string farmName);

    Certification[] public certifications;

    function submitCertification(string memory cropName, string memory farmName, string memory location) public {
        certifications.push(Certification({
            cropName: cropName,
            farmName: farmName,
            location: location,
            timestamp: block.timestamp,
            farmer: msg.sender
        }));

        uint256 certId = certifications.length - 1;

        // emit the event once the the certificate is created
        emit CropCertified(certId, msg.sender, cropName, farmName);
    }

    function getCertification(uint256 certId) public view returns (Certification memory) {
        require(certId < certifications.length, "Certification does not exist");
        return certifications[certId];
    }
}
