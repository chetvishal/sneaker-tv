import React, { useState } from 'react';
import './Home.css';
import { Card } from '../../Components/index';
import { useDataContext } from '../../Context/DataContext';
import Loading from '../../Assets/3.gif';

export const Home = ({ searchKeyword }) => {

    const { state } = useDataContext();
    const { videos } = state;
    console.log(videos)

    return (
        <div className="home">
            {
                videos.length === 0 ?
                    <img src={Loading} /> :
                    videos.map((item, index) => {
                        return item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ?
                            <Card data={item} key={item._id} /> : null
                    })
            }
        </div>
    )
}