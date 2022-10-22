import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import classes from "./converter.module.scss";

function App() {
  // const [rates, setRates] = useState({});
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  useEffect(() => {
    fetch("https://cdn.cur.su/api/latest.json")
      .then((res) => res.json())
      .then((data) => {
        // setRates(data.rates);
        ratesRef.current = data.rates;
        onChangeToPrice(1);
      })
      .catch((err) => console.warn(err));
    // eslint-disable-next-line
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
    // eslint-disable-next-line
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
    // eslint-disable-next-line
  }, [toCurrency]);

  return (
    <div className={classes.converterbody}>
      <div className={classes.App}>
        <Block
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
    </div>
  );
}

export default App;
