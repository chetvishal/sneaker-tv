import styles from './PlaylistPg.module.css';
import { Card } from '../../Components/index';
import {Pencil, Dustbin, Tick} from '../../Assets/index';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';
import Loading from '../../Assets/3.gif';

export const PlaylistPg = () => {
    const { dispatch, state } = useDataContext();
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const { videos, playList } = state;
    // const { list, name, defaultPlayList, id } = data;
    const [toggleInput, setToggleInput] = useState(true);


    const findPlaylist = () => {
        const obj = playList.find(i => i.id === playlistId);
        return obj
    }
    const handleToggleInput = () => setToggleInput(() => !toggleInput)
    const handleInputChange = (e) => setInputVal(() => e.target.value)
    const handleChangeNameBtn = () => {
        dispatch({ type: 'CHANGE_PLAYLIST_NAME', payload: { id: id, data: inputVal } })
        handleToggleInput();
    }
    const handleDeleteBtn = () => {
        dispatch({ type: 'DELETE_PLAYLIST', payload: id })
        navigate('/library')
    }


    const filterPlayListVideo = (videoList, PlayListIdList) => {
        const data = [];
        videoList.map(i => {
            const findItem = PlayListIdList.find(item => item === i.vidId)
            if (findItem) { data.push(i) } else return 1
        })
        return data;
    }

    const playlistObj = findPlaylist()
    const { list, name, defaultPlayList, id } = playlistObj ? playlistObj : false;

    const [inputVal, setInputVal] = useState(name);
    const playlist = list ? filterPlayListVideo(videos, list) : [];

    return (
        playlist.length === 0 ?
            <img src={Loading} alt="loading"/> :
            <div className={styles.playlist}>
                <div className={styles.playlist_info}>
                    {
                        toggleInput ?
                            <div className={styles.toggle_input}>
                                <h2 style={{ marginLeft: "1rem" }}>{name}</h2>
                                <div className={styles.playlist_info_logo} style={{ display: defaultPlayList ? "none" : "" }}>
                                    <Pencil className="svg-icon" onClick={handleToggleInput} />
                                </div>
                            </div>
                            :
                            <div className={styles.toggle_input}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="input-styled"
                                    defaultValue={name}
                                    onChange={handleInputChange}
                                />
                                <div className={styles.playlist_info_logo} style={{ display: defaultPlayList ? "none" : "" }}>
                                    <Tick className="svg-icon" onClick={handleChangeNameBtn} id={id} />
                                    <Dustbin className="svg-icon" onClick={handleDeleteBtn} style={{ marginLeft: "1rem" }} />
                                </div>
                            </div>
                    }
                </div>
                <div className={styles.playlist_videos}>
                    {playlist.map(item => {
                        return <Card data={item} />
                    })}
                </div>
            </div>
    )
}