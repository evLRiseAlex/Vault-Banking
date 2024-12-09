import styles from "./index.module.css";
import PropTypes from "prop-types";

function HomeSection({
  imagePath,
  iconPath,
  featureTitle,
  featureText,
  flexDirection,
  isVisible,
  imagePathLowRes,
}) {
  return (
    <section
      className={styles.sectionContainer}
      style={{
        flexDirection: flexDirection,
      }}
    >
      <div
        className={`${styles.imageContainer} ${styles.imageLazy} section-image`}
        style={{
          backgroundImage: `url(${isVisible ? imagePath : imagePathLowRes})`,
          backgroundSize: "cover",
          filter: isVisible ? "blur(0)" : "blur(10px)", // Blur transitions
          transition: "filter 0.5s ease-out, background-image 0.5s ease-in",
        }}
      ></div>
      <article className={styles.articleContainer}>
        <div className={styles.iconContainer}>
          <img src={iconPath} alt="" className={styles.icon} />
        </div>
        <h5 className={styles.sectionHeader}>{featureTitle}</h5>
        <p className={styles.sectionParagraph}>{featureText}</p>
      </article>
    </section>
  );
}

HomeSection.propTypes = {
  imagePath: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  featureTitle: PropTypes.string.isRequired,
  featureText: PropTypes.string.isRequired,
  flexDirection: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  imagePathLowRes: PropTypes.string.isRequired,
};

export default HomeSection;
