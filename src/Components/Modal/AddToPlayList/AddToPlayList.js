import { useState } from "react";
import styles from './AddToPlayList.module.css';
import { Close } from '../../../Assets/index';
import { useDataContext } from '../../../Context/DataContext';

export const AddToPlayList = ({ visibility, toggleVisibility, videoId }) => {

    const [newPlayListName, setNewPlayListName] = useState("");
    const { state, updateServer } = useDataContext();
    const { playList } = state;
    const defaultPlaylist = [
        {
            _id: "2",
            name: "Watch Later",
            list: [],
            defaultPlayList: true
        },
        {
            _id: "1",
            name: "Liked Videos",
            list: [],
            defaultPlayList: true
        },
    ]


    const checkVideoInPlayList = list => list.find(item => item === videoId) ? true : false;

    const handleInput = e => setNewPlayListName(() => e.target.value);

    const handleCreateNewPlayList = (e) => {
        console.log("e.target.name; ", e.target.name)
        console.log("newPlaylistName: ", newPlayListName)
        if (e.target.id === "1" || e.target.id === "2" || e.target.id === "3") {
            e.target.id === "3" ?
                updateServer('INITIALIZE_NEW_PLAYLIST', { newPlayListName: newPlayListName, videoId, defaultPlayList: true }) :
                updateServer('INITIALIZE_NEW_PLAYLIST', { newPlayListName: e.target.name, videoId, defaultPlayList: true })

            setNewPlayListName("")
        } else {
            newPlayListName ?
                updateServer('CREATE_NEW_PLAYLIST', { newPlayListName, videoId })
                :
                alert("Please enter playlist name.")
            setNewPlayListName("")
        }
    }

    const handleAddToPlayList = (e) => {
        e.target.checked ?
            updateServer('ADD_TO_PLAYLIST', { playListId: e.target.id, videoId })
            :
            updateServer('REMOVE_FROM_PLAYLIST', { playListId: e.target.id, videoId })
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
                        playList.length !== 0 ? playList.map(item => {

                            const check = checkVideoInPlayList(item.list)

                            return (
                                <div className={styles.addToPlayList__modalItem} key={item._id}>
                                    <input
                                        type="checkbox"
                                        id={item._id}
                                        onChange={handleAddToPlayList}
                                        checked={check}
                                    />
                                    <span className={styles.addToPlayList__modalItemName}>{item.name}</span>
                                </div>
                            )
                        })
                            :
                            defaultPlaylist.map(item => {
                                return (
                                    <div className={styles.addToPlayList__modalItem} key={item._id}>
                                        <input
                                            type="checkbox"
                                            id={item._id}
                                            name={item.name}
                                            onChange={handleCreateNewPlayList}
                                        // checked={check}
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
                            id={playList.length === 0 ? "3" : "djkaf"}
                        >
                            CREATE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}