import FeatureBox from "./FeatureBox";
import styles from "./feature-section.module.scss";

const FeatureScreen = () => {
  return (
    <section className={styles.sectionFeatures}>
      <div className={styles.row}>
        <FeatureBox
          headingText=" Explore the World"
          subText=" "
          icon="basic-world"
        />
        <FeatureBox
          headingText=" Meet Nature"
          subText=" "
          icon="basic-compass"
        />
        <FeatureBox
          headingText="Find Your Way"
          subText=" "
          icon="basic-map"
        />
        <FeatureBox
          headingText="Live A healthier life"
          subText=" "
          icon="basic-heart"
        />
      </div>
    </section>
  );
};

export default FeatureScreen;
