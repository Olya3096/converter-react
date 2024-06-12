import { useState } from "react";
import styles from "./Form.module.css";
import { getCurrencies } from "../../../services/getCurrencies";

const Form = () => {
  const [error, setError] = useState("");
  const [result, setResult] = useState("0.00");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = event.target.elements.amount.value;
    const currency = event.target.elements.currency.value;

    try {
      setLoading(true);
      const data = await getCurrencies(currency);
      if (!isDataValid(data)) {
        setError("Sorry, something went wrong. Please try again later.");
        return;
      }
      setError("");

      const rate = data.rates[0].mid;
      const calculatedResult = (amount * rate).toFixed(2);
      setResult(calculatedResult);
    } catch (error) {
      console.error(error);
      setError("Sorry, something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isDataValid = (data) => {
    return data?.rates?.length > 0 && data.rates[0].mid;
  };

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
            placeholder="Enter amount"
            required
          />
          <select
            name="currency"
            id="currency"
            className={styles.selectCurrency}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <span className={styles.equalSign}>&#61;</span>
        )}
        <div className={styles.currencyBoxes}>
          {result}
          <span className={styles.defaultCurrency}>PLN</span>
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
