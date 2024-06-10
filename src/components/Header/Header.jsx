import styles from "./Header.module.css";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1 className={styles.title}>CURRENCY CONVERTER</h1>
    </header>
  );
};

export default Header;
