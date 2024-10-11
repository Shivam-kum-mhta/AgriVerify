const { expect } = require("chai");

describe("AgriVerify Contract", function () {
  let AgriVerify, agriVerify, owner, addr1, addr2;

  beforeEach(async function () {
    // Get contract factory and signers
    AgriVerify = await ethers.getContractFactory("AgriVerify");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    agriVerify = await AgriVerify.deploy();
  });

  it("Should set the correct owner", async function () {
    expect(await agriVerify.owner()).to.equal(owner.address);
  });

  it("Should allow farmers to submit certification", async function () {
    await agriVerify.connect(addr1).submitCertification(
      "Apples",
      "Green Farm",
      "Location 123"
    );

    const crop = await agriVerify.getCropInfo(addr1.address);
    expect(crop.name).to.equal("Apples");
    expect(crop.farmName).to.equal("Green Farm");
    expect(crop.location).to.equal("Location 123");
    expect(crop.certified).to.equal(true);
  });

  it("Should emit CropCertified event", async function () {
    await expect(agriVerify.connect(addr1).submitCertification(
      "Wheat",
      "Golden Farm",
      "Location 456"
    ))
    .to.emit(agriVerify, "CropCertified")
    .withArgs(addr1.address, "Wheat");
  });

  it("Should return correct crop info", async function () {
    await agriVerify.connect(addr2).submitCertification(
      "Tomatoes",
      "Red Farm",
      "Location 789"
    );
    const crop = await agriVerify.getCropInfo(addr2.address);
    expect(crop.name).to.equal("Tomatoes");
    expect(crop.farmName).to.equal("Red Farm");
    expect(crop.location).to.equal("Location 789");
    expect(crop.certified).to.equal(true);
  });
});
