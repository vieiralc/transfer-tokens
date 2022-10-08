import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import './App.css';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {
  const [greeting, setGreetingValue] = useState('');
  const [chainMessage, setChainMessage] = useState('');

  useEffect(() => {
    feetchGreeting();
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function feetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        setChainMessage(data);
      } catch (err) {
        alert(
          'There was an error while fetching the contract, please try again later.'
        );
        console.error('Error:', err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue('');
      await transaction.wait();
      feetchGreeting();
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Message: {chainMessage}</h2>

        <input
          name='greetingValue'
          value={greeting}
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder='Set greeting'
        />
        <button onClick={setGreeting}>Set Greeting</button>
      </header>
    </div>
  );
}

export default App;
