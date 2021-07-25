import { useState } from "react";
import styles from './AddToPlayList.module.css';
import {  Close } from '../../../Assets/index';
import { useDataContext } from '../../../Context/DataContext';

export const AddToPlayList = ({ visibility, toggleVisibility, videoId }) => {

    const [newPlayListName, setNewPlayListName] = useState("");
    const { state, dispatch } = useDataContext();
    const { playList } = state;


    const checkVideoInPlayList = list => list.find(item => item === videoId) ? true : false;

    const handleInput = e => setNewPlayListName(() => e.target.value);

    const handleCreateNewPlayList = (e) => {
        newPlayListName ?
            dispatch({ type: "CREATE_NEW_PLAYLIST", payload: { name: newPlayListName, data: videoId } }) :
            alert("Please enter playlist name.")
        setNewPlayListName("")
    }

    const handleAddToPlayList = (e) => {
        e.target.checked ?
            dispatch({ type: 'ADD_TO_PLAYLIST', payload: { id: e.target.id, data: videoId } }) :
            dispatch({ type: 'REMOVE_FROM_PLAYLIST', payload: { id: e.target.id, data: videoId } })
    }

    return (
        <div className={styles.addToPlayList} style={{ display: visibility ? "" : "none" }} >
            <div className={styles.addToPlayList__modal}>
                <div className={styles.addToPlayList__modalHeading}>
                    <span>Save to...</span>
                    <Close style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }} onClick={toggleVisibility} />
                </div>
                <hr />
                <div className={styles.addToPlayList__modalList}>
                    {
                        playList && playList.map(item => {

                            const check = checkVideoInPlayList(item.list)

                            return (
                                <div className={styles.addToPlayList__modalItem}>
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        onChange={handleAddToPlayList}
                                        checked={check}
                                    />
                                    <span className={styles.addToPlayList__modalItemName}>{item.name}</span>
                                </div>
                            )
                        })
                    }

                </div>
                <hr />
                <div className={styles.addToPlaylist__create}>
                    <input type="text" placeholder="Enter playlist name..." className={`input-styled ${styles.addToPlaylist__input}`} onChange={handleInput} value={newPlayListName} />
                    <div className={styles.addToPlaylist__button}>
                        <div className="btn btn-icon txt-primary"
                            onClick={handleCreateNewPlayList}
                        >
                            <i className="fas fa-plus"></i>
                            CREATE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}