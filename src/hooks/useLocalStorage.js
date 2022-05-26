function useLocalStorage(key, initialValue) {
  const getValue = () => {
    const value = window.localStorage.getItem(key);
    if (value === null) return initialValue;
    return value;
  };

  const setValue = (value) => {
    window.localStorage.setItem(key, value);
  };

  return [getValue, setValue];
}

export default useLocalStorage;
