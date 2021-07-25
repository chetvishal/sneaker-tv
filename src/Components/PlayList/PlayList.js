import styles from './PlayList.module.css';
import { Card } from '../Card/Card';
import {Pencil, Dustbin, Tick, ExternalLInk} from '../../Assets/index'
import { useState } from 'react';
import {useNavigate} from 'react-router';
import { useDataContext } from '../../Context/DataContext';

export const PlayList = ({ data }) => {

    const { dispatch, state } = useDataContext();
    const navigate = useNavigate();
    const { videos } = state;
    const { list, name, defaultPlayList, id } = data;
    const [toggleInput, setToggleInput] = useState(true);
    const [inputVal, setInputVal] = useState(name);
    const handleToggleInput = () => setToggleInput(() => !toggleInput)
    const handleInputChange = (e) => setInputVal(() => e.target.value)
    const handleChangeNameBtn = () => {
        // console.log(inputVal)
        dispatch({ type: 'CHANGE_PLAYLIST_NAME', payload: { id: id, data: inputVal } })
        handleToggleInput();
    }
    const handleDeleteBtn = () => dispatch({ type: 'DELETE_PLAYLIST', payload: id })


    const filterPlayListVideo = (videoList, PlayListIdList) => {
        const data = [];
        videoList.map(i => {
            const findItem = PlayListIdList.find(item => item === i.vidId)
            if (findItem) { data.push(i) } else return
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
                            <div className={styles.playlist__logo} style={{ display: defaultPlayList ? "none" : "" }}>
                                <Pencil className="svg-icon" onClick={handleToggleInput} />
                                <ExternalLInk className="svg-icon" style={{ marginLeft: "1rem", height: "32px", width: "21px" }} 
                                    onClick={() => navigate(`/library/${id}`)}
                                />
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
                                <Tick className="svg-icon" onClick={handleChangeNameBtn} id={id} />
                                <Dustbin className="svg-icon" onClick={handleDeleteBtn} style={{ marginLeft: "1rem" }} />
                            </div>
                        </div>
                }
            </div>
            <div className={styles.playlist__videos}>
                {playlist.map(item => {
                    return <Card data={item} />
                })}
            </div>
        </div>
    )
}