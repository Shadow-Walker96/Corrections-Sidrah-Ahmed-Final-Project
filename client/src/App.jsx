import { useState, useEffect } from 'react';
import PatentdAppAbi from './PatentdAppABI.json';
import { ethers } from 'ethers';
import { Patents } from "./Components/Patents";
import { Pay } from "./Components/Pay";
import './App.css';

function App() {
  // State variables for the application
  const [state, setState] = useState({
    provider: null, // Ethereum provider
    signer: null,   // Ethereum signer
    contract: null, // Smart contract instance
  });
  const [account, setAccount] = useState('Not connected'); // User's Ethereum account
  const [patentId, setPatentId] = useState(0); // Input for checking a patent by ID
  const [patentTitle, setPatentTitle] = useState(''); // Input for patent title
  const [patentDescription, setPatentDescription] = useState(''); // Input for patent description
  const [patents, setPatents] = useState([]); // List of registered patents

  // Initialize your contract address here
  const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

  useEffect(() => {
    const initialize = async () => {
      try {
        const { ethereum } = window;

        // Request Ethereum accounts from the user
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Handle changes in the connected Ethereum account
        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        });

        // Set the connected Ethereum account
        setAccount(accounts[0]);

        // Create Ethereum provider and signer
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Create an instance of your PatentdApp contract
        const contract = new ethers.Contract(contractAddress, PatentdAppAbi.abi, signer);

        // Set the application state with provider, signer, and contract
        setState({ provider, signer, contract });

        // Retrieve and display the list of registered patents
        getPatents(contract);
      } catch (error) {
        console.log(error);
      }
    };

    initialize();
  }, [contractAddress]);

  // Function to get the patents from the contract
  const getPatents = async (contract) => {
    try {
      // Call the numberOfPatents function to get the total number of patents
      const numPatents = await contract.numberOfPatents();
      const patentsArray = [];
      
      // Loop through the patents using the getPatent function
      for (let i = 1; i <= numPatents; i++) {
        const patent = await contract.getPatent(i);
        patentsArray.push(patent);
      }
      
      // Update the patents state with the retrieved data
      setPatents(patentsArray);
    } catch (error) {
      console.error('Error fetching patents:', error);
    }
  };

  // Function to register a new patent
  const registerPatent = async () => {
    try {
      const contract = state.contract;
      
      // Call the register patent function with the provided details and fee
      const txResponse = await contract.payPatentFee(patentTitle, patentDescription, {
        value: ethers.utils.parseEther('0.20'), // Pay the fee (adjust value as needed)
      });

      // Wait for the transaction to be mined
      await txResponse.wait();

      // Update the patents list
      getPatents(contract);
      
      // Clear the input fields
      setPatentTitle('');
      setPatentDescription('');
    } catch (error) {
      console.error('Error registering patent:', error);
    }
  };

  // Function to check a patent by its ID
  const checkPatent = async () => {
    try {
      const contract = state.contract;
      const patent = await contract.getPatent(patentId);
      
      // Display or handle the retrieved patent data as needed
      console.log('Patent Details:', patent);
    } catch (error) {
      console.error('Error checking patent:', error);
    }
  };

  return (
    <div>
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>

      {/* Option to register a patent */}
      <div>
        <h4>Register a Patent</h4>
        <input
          type="text"
          placeholder="Patent Title"
          value={patentTitle}
          onChange={(e) => setPatentTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Patent Description"
          value={patentDescription}
          onChange={(e) => setPatentDescription(e.target.value)}
        />
        <button onClick={registerPatent}>Register</button>
      </div>

      {/* Option to check a patent by ID */}
      <div>
        <h4>Check a Patent by ID</h4>
        <input
          type="number"
          placeholder="Patent ID"
          value={patentId}
          onChange={(e) => setPatentId(e.target.value)}
        />
        <button onClick={checkPatent}>Check</button>
      </div>

      {/* Option to list all registered patents */}
      <div>
        <h4>All Registered Patents</h4>
        <ul>
          {patents.map((patent, index) => (
            <li key={index}>
              Patent ID: {patent.patentId}, Title: {patent.title}, Description: {patent.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Pass state and patents data to child components */}
      <Pay state={state} />
      <Patents state={state} patents={patents} />
    </div>
  );
}

export default App;
