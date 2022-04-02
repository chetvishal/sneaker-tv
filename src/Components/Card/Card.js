import React from 'react';
import styles from './card.module.css';
import { Link } from 'react-router-dom';
export const Card = ({ data }) => {

    return (
        <Link to={`/video/${data.vidId}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.cardSmall}>
                <div className={styles.cardSmall__imageContainer}>
                    <img src={`https://img.youtube.com/vi/${data.vidId}/maxresdefault.jpg`} alt="" className={styles.cardSmall__image} />
                </div>
                <div className={styles.cardSmall__content}>
                    <div>
                        <span className={styles.cardSmall__title}>{data.title}</span>
                        <span className={styles.cardSmall__subHeading}>{data.youtuber}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}