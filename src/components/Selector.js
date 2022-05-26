import { useState } from "react";
import { currencyCodes } from "../constants";

function Selector({ value, setValue }) {
  const [selectorValue, setSelectorValue] = useState(value);

  const handleChange = (e) => {
    for (const [code, currency] of Object.entries(currencyCodes)) {
      if (currency === e.target.value) {
        setSelectorValue(code);
        setValue(code);
      }
    }
  };

  return (
    <select
      name="currency-select"
      className="border-[#2D2F3A] bg-transparent border-2 border-solid rounded-md p-1 mb-2 w-[97px]"
      value={currencyCodes[selectorValue]}
      onChange={handleChange}
    >
      {Object.keys(currencyCodes).map((code, index) => {
        return <option key={index}>{currencyCodes[code]}</option>;
      })}
    </select>
  );
}

export default Selector;
