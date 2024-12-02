import styles from "../styles/homesection.module.css";

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
        <h5>{featureTitle}</h5>
        <p>{featureText}</p>
      </article>
    </section>
  );
}

export default HomeSection;
