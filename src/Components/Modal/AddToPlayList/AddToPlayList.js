import { useState } from "react";
import './AddToPlayList.css';
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
        <div className="addToPlayList-modal-body" style={{ display: visibility ? "" : "none" }} >
            <div className="addToPlayList-modal">
                <div className="close-modal">
                    <span>Save to...</span>
                    <Close style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }} onClick={toggleVisibility} />
                </div>
                <hr />
                <div className="playlist-list">
                    {
                        playList && playList.map(item => {

                            const check = checkVideoInPlayList(item.list)

                            return (
                                <div className="playlist-item">
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        onChange={handleAddToPlayList}
                                        checked={check}
                                    />
                                    <span className="playlist-name">{item.name}</span>
                                </div>
                            )
                        })
                    }

                </div>
                <hr />
                <div className="create-new-playlist">
                    <input type="text" placeholder="Enter playlist name..." class="input-styled modal-input" onChange={handleInput} value={newPlayListName} />
                    <div className="create-playlist-btn">
                        <div class="btn btn-icon txt-primary"
                            onClick={handleCreateNewPlayList}
                        >
                            <i class="fas fa-plus"></i>
                            CREATE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}