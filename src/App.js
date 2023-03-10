import "./styles.css";
import { useState, useEffect } from "react";
import Crypto from "./crypto.json";

// API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

export default function App() {
  const COIN_NAMES = {
    BTCUSDT: "Bitcoin",
    ETHUSDT: "Etherium",
    SOLUSDT: "Solana",
    ADAUSDT: "Cardano",
    DOGEUSDT: "Dogecoin",
  };
  // Names are not provided in the JSON so I pulled this array from the
  // COIN_NAMES array in an attempt to write DRY code.
  const DESIRED_COINS = Object.keys(COIN_NAMES);

  const [cryptoData, setCryptoData] = useState([]);

  async function getCryptoData() {
    try {
      const response = await fetch(
        "https://api2.binance.com/api/v3/ticker/24hr"
      );
      const json = await response.json();
      const filteredCryptoData = json.filter((item) => {
        if (DESIRED_COINS.includes(item.symbol)) {
          return true;
        }
      });
      setCryptoData(filteredCryptoData);
    } catch (error) {
      console.log(error);
    }
  }

  // Runs when the second argument changes. 
  // No argument means that it runs only on the first render. 
  useEffect(() => {
    getCryptoData();
  }, []); // component did mount

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's Cryptocurrency Prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin, i) => {
              return (
                <tr key={coin.symbol}>
                  <td>{i + 1}</td>
                  <td>{COIN_NAMES[coin.symbol]}</td>
                  <td>${Number(coin.lastPrice).toFixed(2)}</td>
                  <td
                    style={
                      coin.priceChangePercent > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {coin.priceChangePercent > 0 ? "???" : "???"}
                    {Number(coin.priceChangePercent).toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
