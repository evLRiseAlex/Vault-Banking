import { homeFeaturesData } from "./contants";
import HomeSection from "./HomeSection";
import styles from "../styles/homefeatures.module.css";
import { useEffect, useState } from "react";

function HomeFeatures() {
  const [featuresClasses, setFeaturesClasses] = useState(
    `${styles.featuresContainer} ${styles.featuresHidden}`
  );
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const sectionReveal = function ([entry], sectionObserver) {
      if (!entry.isIntersecting) return;
      setFeaturesClasses(`${styles.featuresContainer}`);
      sectionObserver.disconnect();
    };
    const section = document.querySelector("#section1");
    const sectionObserver = new IntersectionObserver(sectionReveal, {
      root: null,
      threshold: 0.1,
    });

    sectionObserver.observe(section);

    const images = document.querySelectorAll(`.section-image`);
    const imageReveal = function ([entry], imageObserver) {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      imageObserver.disconnect();
    };
    const imageObserver = new IntersectionObserver(imageReveal, {
      root: null,
      threshold: 0.3,
    });

    images.forEach((image) => imageObserver.observe(image));
    return () => {};
  }, []);
  return (
    <section className={featuresClasses} id="section1">
      <div className={styles.titleContainer}>
        <h2
          style={{
            color: "rgb(169, 106, 199)",
            fontSize: "28px",
          }}
        >
          Features
        </h2>
        <h3>The advantages of using vault are seemingly endless.</h3>
      </div>
      <div>
        {homeFeaturesData.map((entry, index) => {
          let flexDirection;
          if (index % 2 === 0) {
            flexDirection = "row";
          } else flexDirection = "row-reverse";
          return (
            <HomeSection
              key={entry.featureTitle}
              featureTitle={entry.featureTitle}
              featureText={entry.featureText}
              iconPath={entry.iconPath}
              imagePath={entry.imagePath}
              imagePathLowRes={entry.imagePathLowRes}
              flexDirection={flexDirection}
              isVisible={isVisible}
            />
          );
        })}
      </div>
    </section>
  );
}

export default HomeFeatures;
