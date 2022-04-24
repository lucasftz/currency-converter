function CurrencyForm({ value, setValue }) {
  return (
    <form>
      <input
        className="border-[#2D2F3A] bg-transparent border-2 border-solid rounded-md p-2"
        type="number"
        step="any"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export default CurrencyForm;
