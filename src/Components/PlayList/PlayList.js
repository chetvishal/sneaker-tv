import styles from './PlayList.module.css';
import { Card } from '../Card/Card';
import { Pencil, Dustbin, Tick, ExternalLInk } from '../../Assets/index'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDataContext } from '../../Context/DataContext';

export const PlayList = ({ data, hideNavigate }) => {

    const { state, updateServer } = useDataContext();
    const navigate = useNavigate();
    const { videos } = state;
    const { list, name, defaultPlayList, _id } = data;
    const [toggleInput, setToggleInput] = useState(true);
    const [inputVal, setInputVal] = useState(name);


    const handleToggleInput = () => setToggleInput(() => !toggleInput)
    const handleInputChange = (e) => setInputVal(() => e.target.value)
    const handleChangeNameBtn = () => {
        if (name === inputVal) {
            handleToggleInput();
        } else {
            updateServer('CHANGE_PLAYLIST_NAME', { playListId: _id, newName: inputVal })
            handleToggleInput();
        }
    }
    const handleDeleteBtn = () => {
        updateServer('DELETE_PLAYLIST', { playListId: _id })
        navigate('/library')
    }


    const filterPlayListVideo = (videoList, PlayListIdList) => {
        const data = [];
        videoList.map(i => {
            const findItem = PlayListIdList.find(item => item === i.vidId)
            if (findItem) { return data.push(i) }
            else return 0
        })
        return data;
    }

    const playlist = filterPlayListVideo(videos, list);

    return (
        <div className={styles.playlist}>
            <div className={styles.playlist__info}>
                {
                    toggleInput ?
                        <div className={styles.playlist__input}>
                            <h2 style={{ marginLeft: "1rem" }}>{name}</h2>
                            <div className={styles.playlist__logo}
                            >
                                <Pencil className="svg-icon" onClick={handleToggleInput} style={{ display: defaultPlayList ? "none" : "" }} />

                                {!hideNavigate ? <ExternalLInk className="svg-icon" style={{ marginLeft: defaultPlayList ? "0" : "1rem", height: "32px", width: "21px" }}
                                    onClick={() => navigate(`/library/${_id}`)}
                                /> : null}
                            </div>
                        </div>
                        :
                        <div className={styles.playlist__input}>
                            <input
                                type="text"
                                placeholder="Title"
                                className="input-styled"
                                defaultValue={name}
                                onChange={handleInputChange}
                            />
                            <div className={styles.playlist__logo} style={{ display: defaultPlayList ? "none" : "" }}>
                                <Tick className="svg-icon" onClick={handleChangeNameBtn} id={_id} />
                                <Dustbin className="svg-icon" onClick={handleDeleteBtn} style={{ marginLeft: "1rem" }} />
                            </div>
                        </div>
                }
            </div>
            <div className={styles.playlist__videos}>
                {playlist.length !== 0 ? playlist.map(item => {
                    return <Card data={item} key={item._id}/>
                })
                    :
                    <div>
                        <h4 className={styles.playlist__empty}>This Playlist is currently empty</h4>
                        <button className={`submit-button ${styles.submitButton}`}
                            onClick={() => navigate('/')}
                        >Checkout Videos</button>
                    </div>
                }
            </div>
        </div>
    )
}