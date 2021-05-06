import React from 'react';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export const Card = ({data}) => {

    return (
        <Link to={`/video/${data.vidId}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div class="card-small">
                <div class="card-small-image">
                    <img src={`https://img.youtube.com/vi/${data.vidId}/maxresdefault.jpg`} alt="" />
                </div>
                <div class="card-small-content">
                    <div>
                        <span class="card-small-title">{data.title}</span>
                        <span className="card-small-sub-heading">{data.youtuber}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}