import styles from "../styles/home.module.css";

import HomeFeatures from "./HomeFeatures";
import { Card, StylingLine } from "../common";

function HomePage() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.homeText}>
          <h1>Banking Made Easy</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
            blanditiis laborum dolore repudiandae alias ipsa natus dignissimos
            debitis numquam. Dignissimos nostrum nobis excepturi quidem
            veritatis aliquid sit iure, officia adipisci!
          </p>
          <button
            onClick={() => {
              document
                .querySelector(`#line1`)
                .scrollIntoView({ behavior: `smooth` });
            }}
            className={styles.btnScrollTo}
          >
            Learn more ⬇
          </button>
        </div>
        <div>
          <Card />
        </div>
      </div>
      <div id="line1">
        <StylingLine />
      </div>
      <HomeFeatures />
    </main>
  );
}

export default HomePage;
