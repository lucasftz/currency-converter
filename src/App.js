import { useState, useEffect } from "react";
import { API_KEY } from "./secrets";
// icons
import { FaArrowRight } from "react-icons/fa";
// constants
import { currencyCodes } from "./constants";
// components
import Selector from "./components/Selector";

function App() {
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PEN");
  const [rates, setRates] = useState({});

  const fetchRates = () => {
    fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  };

  // fetch data on initial render
  fetchRates();

  // only re-fetch the data when changing currencies to save on API calls
  useEffect(() => {
    fetchRates();
  }, [to, from]);

  // update the output every time the input changes
  useEffect(() => {
    setOutput(input * (rates[to] / rates[from]));
  }, [input, to, from, rates]);

  return (
    <div className="App">
      <div className="bg-[#1E2027] text-neutral-300 p-5">
        {/* select input/output currencies */}
        <div className="flex gap-1">
          <Selector value={from} setValue={setFrom} />
          <FaArrowRight className="self-center mb-2" />
          <Selector value={to} setValue={setTo} />
        </div>
        {/* input form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="border-[#2D2F3A] bg-transparent border-2 border-solid rounded-md p-2 text-lg"
            type="number"
            step="any"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        {/* output */}
        <p className="text-lg mt-3">
          <strong>{output.toFixed(2)}</strong>
        </p>
        <p className="text-sm">{currencyCodes[to]}</p>
      </div>
    </div>
  );
}

export default App;
