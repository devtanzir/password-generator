import { useCallback, useState, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(12);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, SetPassword] = useState(false);

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~`!@#$%^&*()_+-=|{}?</>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }

    SetPassword(pass);
  }, [length, numberAllowed, charAllowed, SetPassword]);

  const copyPassWordToClipBord = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="flex justify-center align-middle">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 mt-20 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassWordToClipBord}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label> length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
