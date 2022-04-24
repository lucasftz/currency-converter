import { useState } from "react";
import { API_KEY } from "./secrets";
import { currencyCodes } from "./constants";

function App() {
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PEN");

  const convertInput = (e) => {
    e.preventDefault();
    fetch("http://data.fixer.io/api/latest" + `?access_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setOutput(input * (data.rates[to] / data.rates[from])));
  };

  return (
    <div className="App">
      <div className="bg-[#1E2027] text-neutral-300 p-5">
        {/* input form */}
        <form onSubmit={convertInput}>
          <input
            className="border-[#2D2F3A] bg-transparent border-2 border-solid rounded-md p-2 text-lg"
            type="number"
            step="any"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convertInput}
          />
        </form>
        <h1 className="text-lg mt-3">
          <strong>{output.toFixed(2)}</strong>
        </h1>
        <h1 className="text-sm">{currencyCodes[to]}</h1>
      </div>
    </div>
  );
}

export default App;
