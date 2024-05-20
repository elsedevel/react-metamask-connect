import "./App.css";
import { Web3Helper } from "./api/account";
import { useEffect, useState } from "react";

function App() {
  const [address, setAddress] = useState(null);

  const open = async () => {
    await Web3Helper.openWalletConnectModal();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          <p>{"CONNECT\nYOUR WALLET\nUSING WALLET CONNECT"}</p>
        </div>
        <div>
          {address ? (
            <button className="App-button-noHover">
              {address.slice(0, 4) + ".".repeat(3) + address.slice(-4)}
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
