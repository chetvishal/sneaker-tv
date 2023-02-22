import React from 'react';
import styles from './Home.module.css'
import { Card, Loader } from '../../Components/index';
import { useDataContext } from '../../Context/DataContext';

export const Home = ({ searchKeyword }) => {

    const { state } = useDataContext();
    const { videos } = state;

    return (
        <div className={styles.home}>
            {
                videos.length === 0 ?
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}><Loader /></div> :
                    videos.map((item, index) => {
                        return item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ?
                            <Card data={item} key={item._id} /> : null
                    })
            }
        </div>
    )
}