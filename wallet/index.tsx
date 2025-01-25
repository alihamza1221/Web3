import { useState } from "react";
import * as bip39 from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
function App() {
  const [mnemonic, setMnemonic] = useState("");

  const [curIndex, setCurIndex] = useState(0);
  const [solAddress, setSolAddress] = useState<string[]>([]);
  return (
    <div
      style={{
        maxWidth: "768px",
        margin: "auto",
      }}
    >
      <button
        onClick={() => {
          setMnemonic(bip39.generateMnemonic());
        }}
      >
        <input type="text" value={mnemonic} /> generateMnemonic
      </button>

      <div>
        <button
          onClick={() => {
            const seed = bip39.mnemonicToSeedSync(mnemonic);

            const path = `m/44'/501'/${curIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(path);
            const wallet = new Wallet(child.privateKey);

            setSolAddress([...solAddress, wallet.address]);
            setCurIndex((prev) => prev + 1);
          }}
        >
          Add Sol Wallets
        </button>

        {solAddress.map((p, i) => (
          <div>
            SOL{i}-{p}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
