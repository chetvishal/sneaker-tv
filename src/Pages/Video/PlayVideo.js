import styles from './PlayVideo.module.css';
import { useState } from 'react';
import { Heart, PlayList, HeartFilled } from '../../Assets/index';
import { useParams } from 'react-router-dom';
import { AddToPlayList } from '../../Components/index';
import { useDataContext } from '../../Context/DataContext';
import Loading from '../../Assets/3.gif';

export const PlayVideo = () => {
    const { id } = useParams();
    const { state, updateServer } = useDataContext();
    const { playList, videos } = state;
    const [viewModal, setViewModal] = useState(false);
    const toggleModalView = () => setViewModal(viewModal => !viewModal);

    const addToLikedVideos = (e) => {
        if (playList.length !== 0) {
            e.target.id === 'ADD_TO_LIKED_VIDEOS' ?
                updateServer('ADD_TO_PLAYLIST', { playListId: playList[1]._id, videoId: id }) :
                updateServer('REMOVE_FROM_PLAYLIST', { playListId: playList[1]._id, videoId: id })
        } else {
            updateServer('INITIALIZE_NEW_PLAYLIST', { newPlayListName: 'Liked Videos', videoId: id, defaultPlayList: true })
        }
    }

    const checkLikedVideo = (key) => {
        if (playList.length !== 0)
            return playList[1].list.find(item => item === key) ? true : false;

        return false;
    }

    const findVideo = () => {
        const obj = videos.find(i => i.vidId === id);
        return obj
    }

    const findVidObj = findVideo();
    const { title, youtuber } = findVidObj ? findVidObj : false;

    return (
        title === false ?
            <img src={Loading} alt="loading" /> :
            <div className={styles.videoPlayer}>

                <div className={styles.iframe_container}>
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        // allowFullScreen
                    ></iframe>
                </div>
                <div className={styles.videoInfo}>
                    <span className="util-heading-medium">{title}</span>
                    <div className={styles.videoInfo__box}>
                        <div className={styles.videoInfo__userInfo}>
                            <span>{youtuber}</span>
                        </div>
                        <div className={styles.actions}>
                            {
                                checkLikedVideo(id) ?
                                    <HeartFilled
                                        style={{ width: "1.3rem", fill: "#ed4956", cursor: "pointer" }}
                                        id="REMOVE_FROM_LIKED_VIDEOS"
                                        onClick={(e) => {
                                            addToLikedVideos(e)
                                        }
                                        }
                                    />
                                    :
                                    <Heart
                                        style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                                        id="ADD_TO_LIKED_VIDEOS"
                                        onClick={(e) => {
                                            addToLikedVideos(e)
                                        }
                                        } />
                            }
                            <PlayList style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }} onClick={toggleModalView} />
                        </div>
                    </div>
                </div>

                <AddToPlayList visibility={viewModal} toggleVisibility={toggleModalView} videoId={id} />

            </div>

    )
}