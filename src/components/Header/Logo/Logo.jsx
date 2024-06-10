import logo from "../../../images/logo-white-transparent.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return <img src={logo} alt="our-logo" className={styles.logoImg} />;
};

export default Logo;
