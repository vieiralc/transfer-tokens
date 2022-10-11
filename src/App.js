import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';
import './App.css';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

function App() {
  const [greeting, setGreetingValue] = useState('');
  const [chainMessage, setChainMessage] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    feetchGreeting();
  }, []);

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log('Balance:', balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      const crisinha = new ethers.providers.Web3Provider(window.ethereum);
      const signer = crisinha.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} LTT Coins successfully sent to ${userAccount}`);
    }
  }

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

        <br />
        <button onClick={getBalance}>Get balance</button>
        <button onClick={sendCoins}>Send LTT Coins</button>
        <input
          type='text'
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder='Account Address'
        />
        <input
          type='text'
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount'
        />
      </header>
    </div>
  );
}

export default App;
