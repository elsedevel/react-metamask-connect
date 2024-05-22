import './App.css';
import { Web3Helper } from './api/account';
import {useState, useEffect} from 'react';

function App() {
  const [account, setAccount] = useState(null);

  const open = async () => {
    const response = await Web3Helper.connect();
    if(response) {
      setAccount(response[0]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-title'>
          <p>
            {"CONNECT\nYOUR WALLET\nUSING METAMASK"}
          </p>
        </div>
        <div>
            {account ? (
              <button className="App-button">
                {account.slice(0, 4) + ".".repeat(3) + account.slice(-4)}
              </button>
            ) : (
              <button className="App-button" onClick={() => open()}>
                CONNECT WALLET
              </button>
            )}
        </div>
      </header>
    </div>
  );
}

export default App;
