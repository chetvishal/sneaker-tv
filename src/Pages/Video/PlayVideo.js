import './PlayVideo.css';
import { useState } from 'react';
import {Heart, PlayList, HeartFilled} from '../../Assets/index';
import { useParams } from 'react-router-dom';
import { AddToPlayList } from '../../Components/index';
import { useDataContext } from '../../Context/DataContext';
import Loading from '../../Assets/3.gif';

export const PlayVideo = () => {
    const { id } = useParams();
    const { state, dispatch } = useDataContext();
    const { playList, videos } = state;
    const [viewModal, setViewModal] = useState(false);
    const toggleModalView = () => setViewModal(viewModal => !viewModal);


    const checkLikedVideo = (key) => {
        return playList[0].list.find(item => item === key) ? true : false;
    }

    const findVideo = () => {
        const obj = videos.find(i => i.vidId === id);
        return obj
    }

    const findObj = findVideo();
    const {title, youtuber} = findObj ? findObj : false;

    return (
        title === false ?
            <img src={Loading} /> :
            <div className="video-player">

                <div className="iframe-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen allow="fullscreen"></iframe>
                </div>
                <div className="video-info">
                    <span className="util-heading-medium">{title}</span>
                    <div className="info-box">
                        <div className="user-info">
                            <span>{youtuber}</span>
                        </div>
                        <div className="actions">
                            {
                                checkLikedVideo(id) ?
                                    <HeartFilled style={{ width: "1.3rem", fill: "#ed4956", cursor: "pointer" }} onClick={() => dispatch({ type: 'REMOVE_FROM_LIKED_VIDEOS', payload: id })} />
                                    :
                                    <Heart style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }} onClick={() => dispatch({ type: 'ADD_TO_LIKED_VIDEOS', payload: id })} />
                            }
                            <PlayList style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }} onClick={toggleModalView} />
                        </div>
                    </div>
                </div>

                <AddToPlayList visibility={viewModal} toggleVisibility={toggleModalView} videoId={id} />

            </div>

    )
}