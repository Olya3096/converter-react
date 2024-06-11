import styles from "./App.module.css";
import DisplayCalculation from "./components/DisplayCalculation/DisplayCalculation";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <main className={styles.mainBackground}>
      <Header />
      <section className={styles.mainShadow}>
        <DisplayCalculation />
      </section>
    </main>
  );
};

export default App;
