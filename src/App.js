import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
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
  const [getFrom, setFrom] = useLocalStorage("fromCurrency", "USD");
  const [getTo, setTo] = useLocalStorage("toCurrency", "CAD");
  const [rates, setRates] = useState({});
  const [isAPICalls, setIsAPICalls] = useState(true);

  const fetchRates = () => {
    fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  };

  // only re-fetch the data when changing currencies to save on API calls
  useEffect(() => {
    fetchRates();
  }, []);

  // update the output every time the input changes
  useEffect(() => {
    try {
      setOutput(input * (rates[getTo()] / rates[getFrom()]));
    } catch (err) {
      if (err instanceof TypeError) {
        setIsAPICalls(false);
      }
    }
  }, [input, rates, getFrom, getTo]);

  return (
    <div className="App">
      <div className="bg-[#1E2027] text-neutral-300 p-5">
        {/* select input/output currencies */}
        <div className="flex gap-1">
          <Selector value={getFrom()} setValue={setFrom} />
          <FaArrowRight className="self-center mb-2" />
          <Selector value={getTo()} setValue={setTo} />
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
        <div>
          {isAPICalls ? (
            <>
              <p className="text-lg mt-3">
                <strong>{output.toFixed(2)}</strong>
              </p>
              <p className="text-sm">{currencyCodes[getTo()]}</p>
            </>
          ) : (
            <>
              <p className="text-lg mt-3">
                <strong>You are out of API calls!</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
