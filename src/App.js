import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(0);

  return (
    <div className="App">
      <form>
        <input
          className="currency-input"
          type="number"
          step="any"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
