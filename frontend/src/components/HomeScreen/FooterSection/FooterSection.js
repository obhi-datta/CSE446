import styles from "./footer-section.module.scss";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_logoBox}>Ecommerce</div>
      <div className={styles.row}>
        <div className={styles.col_1_of_2}>
          <div className={styles.footer_navigation}>
            <ul className={styles.footer_list}>
              <li className={styles.footer_item}>
                <a href="#d" className={styles.footer_link}>
                  Company
                </a>
              </li>
              <li className={styles.footer_item}>
                <a href="#a" className={styles.footer_link}>
                  Contact Us
                </a>
              </li>

              <li className={styles.footer_item}>
                <a href="#a" className={styles.footer_link}>
                  Carrers
                </a>
              </li>
              <li className={styles.footer_item}>
                <a href="#a" className={styles.footer_link}>
                  Privacy Term
                </a>
              </li>
              <li className={styles.footer_item}>
                <a href="#a" className={styles.footer_link}>
                  terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.col_1_of_2}>
          <p className={styles.footer_copyright}>
           
            <a href="#a" className={styles.footer_link}>
             
            </a>{" "}
           
            <a href="#a" className={styles.footer_link}>
             
            </a>
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
