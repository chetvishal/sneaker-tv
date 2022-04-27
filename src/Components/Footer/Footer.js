import styles from './Footer.module.css';

export const Footer = () => {

    return (
        <footer className={styles.footer}>
            <h3 className={styles.footer__heading}>Made by Vishal Singh</h3>
            <span className={styles.footer_social_link}>
                <a href="https://github.com/chetvishal" className="nostyle" rel="noreferrer"target="_blank">
                    <i className="fab fa-github" styles={{color: "black"}}></i>
                </a></span>
            <span className={styles.footer_social_link}>
                <a href="https://www.linkedin.com/in/vishal-singh-1056b7123/" className="nostyle" rel="noreferrer"target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </span>
            <span className={styles.footer_social_link}>
                <a href="https://twitter.com/vshsngh" className="nostyle" rel="noreferrer"target="_blank">
                    <i className="fab fa-twitter"></i>
                </a>
            </span>
        </footer>
    )
}
