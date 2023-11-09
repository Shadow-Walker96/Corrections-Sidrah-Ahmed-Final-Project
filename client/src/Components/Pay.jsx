import { ethers } from "ethers";
import React, { useState } from 'react';
import "./Pay.css";

const Pay = ({ state }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handlePatentFee = async (event) => {
    event.preventDefault();
    const { contract } = state;

    const amount = ethers.utils.parseEther("0.001");

    try {
      const transaction = await contract.PatentFee(name, message, { value: amount });
      await transaction.wait();
      alert("Transaction is successful");
      window.location.reload();
    } catch (error) {
      console.error("Error paying patent fee:", error);
      alert("Transaction failed. Check the console for details.");
    }
  }

  return (
    <div className="center">
      <h1>Thanks</h1>
      <form onSubmit={handlePatentFee}>
        <div className="inputbox">
          <input
            type="text"
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Name</span>
        </div>
        <div className="inputbox">
          <input
            type="text"
            required
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span>Patent Title</span>
        </div>
        <div className="inputbox">
          <input type="submit" value="Pay" disabled={!state.contract} />
        </div>
      </form>
    </div>
  );
}

export default Pay;
