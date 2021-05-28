import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Questionaire from "../components/Questionaire";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div>
      <Navigation />
      <div className={styles.main}>
        <Questionaire />
      </div>
      <Footer />
    </div>
  );
}
