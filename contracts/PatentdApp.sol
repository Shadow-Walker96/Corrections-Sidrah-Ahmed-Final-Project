// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PatentdApp {
    // Declare a state variable to track the number of patents.
    uint40 public numberOfPatents;

    // Declare a mapping to check if a patent with a specific ID exists.
    mapping(uint40 => bool) public patentExists;

    // Define a struct called Patent to represent the characteristics of a patent.
    struct Patent {
        uint40 patentId;       // Unique ID for each patent.
        string name;           // Name of the patent holder (name of individual, company, etc.).
        string title;          // Title of the patent.
        string description;    // Description of the patent.
        address sender;       // Address of the person who registers the patent.
        uint256 filingDate;    // Timestamp when the patent is filed.
        uint256 expirationDate; // Timestamp indicating when the patent expires.
        bool isApproved;       // A boolean flag for the patent's approval status.
    }

    // Create an array to store instances of the Patent struct.
    Patent[] public patents;

    // Declare a state variable to store the owner's address, marked as payable.
    address payable owner;

    // Initialize a variable to track the next available patent ID.
    uint40 nextPatentId = 1;

    // Create a mapping to check for existing patent titles.
    mapping(string => bool) patentTitles;

    // Constructor function, executed once when the contract is deployed.
    constructor() {
        owner = payable(msg.sender); // Assign the contract creator's address as the owner.
    }

    // Function for users to register and pay for a new patent.
    function payPatentFee(string calldata patentName, string calldata patentTitle, string calldata patentDescription) external payable {
        // Check if a patent with the given title already exists.
        require(!patentTitles[patentTitle], "This patent title already exists!");

        // Check if the provided fee is greater than or equal to the minimum fee (e.g., 0.01 ether).
        require(msg.value >= 0.20 ether, "Please pay a fee of at least 1.60 bnb for the patent.");

        // Get the current timestamp as the filing date.
        uint256 filingDate = block.timestamp;

        // Calculate the expiration date, set initially to 5 years from the filing date.
        uint256 expirationDate = filingDate + 5 * 365 days;

        // Set the initial approval status to 'false'.
        bool isApproved = false;

        uint256 ownerFee = msg.value / 10; // For example, owner receives 10th part of the fee
        owner.transfer(ownerFee); // Send the owner's fee
 
        // Create a new Patent struct and store it in the 'patents' array.
        patents[nextPatentId] = Patent({
            patentId: nextPatentId, // Assign the next available patent ID.
            name: patentName,
            title: patentTitle,    // Assign the provided patent title.
            description: patentDescription, // Assign the provided patent description.
            sender: msg.sender, // Set the sender's address to the transaction sender.
            filingDate: filingDate, // Set the filing date.
            expirationDate: expirationDate, // Set the calculated expiration date.
            isApproved: isApproved // Set the approval status.
        });
        
        // Increment the next patent ID for the next patent.
        nextPatentId++;

        // Increment the total number of patents.
        numberOfPatents++;

       // Mark the patent as existing in the 'patentExists' mapping.
       patentExists[nextPatentId] = true;
    }


    // Function to retrieve all registered patents.
    function getAllPatents() public view returns (Patent[] memory) {
        return patents;
    }

    // Function to retrieve information about a specific patent using its ID.
    function getPatent(uint40 patentId) public view returns (Patent memory) {
        // Check if the provided patent ID is valid.
        require(patentId > 0 && patentId <= nextPatentId, "Invalid patent ID");

        // Return details of the patent with the given ID.
        return patents[patentId - 1];
    }
}
