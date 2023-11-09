/**
 * @notice I did some changes to the deploy script to make it work with the current version
 * of hardhat and its package dependencies, i.e "hardhat": "^2.19.0" 
 * 
 * @dev I commented out your code below and refactor it separately.
 * 
 * I left some comments below for command i run in the command line.
 * 
 * First: To compile the solidity code.
 * Second: To deploy the code to the local blockchain i.e Your machine
 * Third: To deploy the code to sepolia test net
 * Fourth: To verify it on sepolia 
 */


/**
 * @dev First: To compile the solidity code.
 * ------>      yarn hardhat compile
  yarn run v1.22.19
  $ /home/shadow-walker/open-source/Sidrah-Ahmed-Final-Project-master/Sidrah-Ahmed-Final-Project-master/node_modules/.bin/hardhat compile
  Compiled 1 Solidity file successfully (evm target: paris).
  Done in 8.47s.


  Second: To deploy the code to the local blockchain i.e Your machine
  -------->       yarn hardhat run scripts/deploy.js
  yarn run v1.22.19
  $ /home/shadow-walker/open-source/Sidrah-Ahmed-Final-Project-master/Sidrah-Ahmed-Final-Project-master/node_modules/.bin/hardhat run scripts/deploy.js
  PatentdApp deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  Created file!!!
  Done in 11.58s.


  Third: To deploy the code to sepolia test net
  -------->  yarn hardhat run scripts/deploy.js --network sepolia
  yarn run v1.22.19
  $ /home/shadow-walker/open-source/Sidrah-Ahmed-Final-Project-master/Sidrah-Ahmed-Final-Project-master/node_modules/.bin/hardhat run scripts/deploy.js --network sepolia
  PatentdApp deployed to: 0xd8394f85aC2472E2eA860D0f78ff48216Ce430F8
  Created file!!!
  Done in 39.69s.


  Fourth: To verify it on sepolia 
  -------->  yarn hardhat verify --network sepolia 0xd8394f85aC2472E2eA860D0f78ff48216Ce430F8
  yarn run v1.22.19
  $ /home/shadow-walker/open-source/Sidrah-Ahmed-Final-Project-master/Sidrah-Ahmed-Final-Project-master/node_modules/.bin/hardhat verify --network sepolia 0xd8394f85aC2472E2eA860D0f78ff48216Ce430F8
  Successfully submitted source code for contract
  contracts/PatentdApp.sol:PatentdApp at 0xd8394f85aC2472E2eA860D0f78ff48216Ce430F8
  for verification on the block explorer. Waiting for verification result...

  Successfully verified contract PatentdApp on the block explorer.
  https://sepolia.etherscan.io/address/0xd8394f85aC2472E2eA860D0f78ff48216Ce430F8#code
  Done in 7.37s.

*/

const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const PatentdApp = await hre.ethers.getContractFactory("PatentdApp");
  const patentdApp = await PatentdApp.deploy();

  await patentdApp.waitForDeployment(); // For Block Comfirmations 

  console.log(`PatentdApp deployed to: ${patentdApp.target}`); // To display the address of the deployed contract

  /**
   * @dev This will create the ABI file for the contract
   */
  if (process.env.create_abi_file == "true") {

    const abi = PatentdApp.interface.formatJson();

    fs.writeFileSync("./PatentdAppABI.json", abi); // To write the ABI to a JSON file, i.e PatentdAppABI.json

    console.log("Created file!!!");

  } else {
    console.log("Already created file!!!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



/*

const hre = require("hardhat");
const hrw = require("hardhat-waffle");
const fs = require("fs");

async function main() {
  const PatentdApp = await hre.ethers.getContractFactory("PatentdApp");
  const patentdApp = await PatentdApp.deploy();

  await patentdApp.deployed();

  console.log("PatentdApp deployed to:", patentdApp.address);

  // Get the contract's ABI
  const abi = JSON.stringify(PatentdApp.interface.abi, null, 2);

  // Write the ABI to a JSON file
  fs.writeFileSync("PatentdAppABI.json", JSON.stringify(abi, null, 2));

  // Exiting the script
  process.exit(0);
}

  const PatentdApp = await hre.ethers.getContractFactory("PatentdApp");
  const patentdApp = await PatentdApp.deploy();
  await patentdApp.deployed();
*/





