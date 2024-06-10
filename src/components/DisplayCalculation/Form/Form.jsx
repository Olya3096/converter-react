import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { getCurrencies } from "../../../services/getCurrencies";

const Form = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [submited, setSubmited] = useState(false);

  const handleChange = (event) => {
    const newAmount = event.target.value;
    setAmount(newAmount);
    if (newAmount === "") {
      setResult("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmited(true);
  };

  const isDataValid = (data) => {
    return data?.rates?.length > 0 && data.rates[0].mid;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrencies(currency);
        if (!isDataValid(data)) {
          setError("Sorry, something went wrong. Please try again later.");
          return;
        }
        setError("");

        const rate = data.rates[0].mid;
        const calculatedResult = (amount * rate).toFixed(2);
        setResult(calculatedResult);
      } catch {
        setError("Sorry, something went wrong. Please try again later.");
      }
    };

    if (submited) {
      fetchData();
      setSubmited(false);
    }
  }, [submited, currency, amount]);

  return (
    <form onSubmit={handleSubmit} id="form" className={styles.form}>
      <div className={styles.box}>
        <div className={styles.currencyBoxes}>
          <input
            id="input"
            type="number"
            className={styles.inputAmount}
            name="amount"
            min="0.01"
            step="0.01"
            placeholder="AMOUNT"
            required
            onChange={handleChange}
          />
          <select
            name="currency"
            id="currency"
            className={styles.selectCurrency}
            onChange={(event) => {
              setCurrency(event.target.value);
            }}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
        <div className={styles.currencyBoxes}>
          <div id="result" className={styles.result}>
            {result}
          </div>
          <div className={styles.defaultCurrency}>PLN</div>
        </div>
      </div>
      <button id="btn-convert" className={styles.btnConvert}>
        CONVERT
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};
export default Form;
