import { useState } from "react";
import CurrencyForm from "./components/CurrencyForm";

function App() {
  const [input, setInput] = useState(0);

  return (
    <div className="App">
      <div className="bg-[#1E2027] text-neutral-300 p-5">
        <CurrencyForm value={input} setValue={setInput} />
      </div>
    </div>
  );
}

export default App;
