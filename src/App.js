import { useState } from "react";

function App() {
  const [input, setInput] = useState(0);

  const convertInput = () => {
    // this will call the fixer API to convert the currency
    console.log(`Input is ${input}`);
  };

  return (
    <div className="App">
      <div className="bg-[#1E2027] text-neutral-300 p-5">
        {/* input form */}
        <form>
          <input
            className="border-[#2D2F3A] bg-transparent border-2 border-solid rounded-md p-2"
            type="number"
            step="any"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convertInput}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
