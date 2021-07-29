import { createContext, useContext, useReducer, useEffect } from 'react';
import { DataReducer } from '../Reducer/DataReducer';
// import {videos} from '../Data/Data';
import { useAuthContext } from './AuthContext';
import axios from 'axios';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const initialDataState = {
    videos: [],
    playList: [

    ]
}

export const DataContextProvider = ({ children }) => {

    const { userDetails, setUserDetails } = useAuthContext();

    async function getData(userData = userDetails) {
        await axios.get('https://sneaker-tv-api.herokuapp.com/videos').then((resp) => {
            dispatch({ type: 'ADD_VIDEOS_FROM_SERVER', payload: resp.data.videos });
        }).catch(err => alert('failed to fetch data from server: ', err));

        await axios.get(`https://sneaker-tv-api.herokuapp.com/playlist/${userData.userId}`, {
            headers: {
                'Authorization': userData.token
            }
        }).then(resp => {
            dispatch({ type: 'ADD_PLAYLIST_FROM_SERVER', payload: resp.data.data.playList });
        })
            .catch(err => console.log("error fetching playlist: ", err))
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateServer = async (action, payload) => {
        switch (action) {
            case 'CREATE_NEW_PLAYLIST': {
                await axios.post(`https://sneaker-tv-api.herokuapp.com/playlist/${userDetails.userId}`, {
                    name: payload.newPlayListName,
                    videoId: payload.videoId,
                    ...payload
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 201) {
                        console.log("CREATE NEW PLAYLIST: resp", response)
                        dispatch({
                            type: "CREATE_NEW_PLAYLIST",
                            payload: {
                                name: payload.newPlayListName,
                                data: payload.videoId,
                                playlistId: response.data.data._id,
                                defaultPlayList: response.data.data.defaultPlayList
                            }
                        })

                    } else {
                        throw Error
                    }
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'INITIALIZE_NEW_PLAYLIST': {
                await axios.post(`https://sneaker-tv-api.herokuapp.com/playlist/${userDetails.userId}`, {
                    name: payload.newPlayListName,
                    videoId: payload.videoId,
                    ...payload
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 201) {
                        console.log("CREATE NEW PLAYLIST: resp", response)
                        dispatch({ type: 'ADD_PLAYLIST_FROM_SERVER', payload: response.data.data.playList });

                    } else {
                        throw Error
                    }
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'ADD_TO_PLAYLIST': {
                await axios.post(`https://sneaker-tv-api.herokuapp.com/playlist/${userDetails.userId}/${payload.playListId}`, {
                    videoId: payload.videoId,
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 201) {
                        dispatch({ type: 'ADD_TO_PLAYLIST', payload: { _id: payload.playListId, data: payload.videoId } })

                    } else {
                        throw Error
                    }
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }

            case 'REMOVE_FROM_PLAYLIST': {
                await axios.delete(`https://sneaker-tv-api.herokuapp.com/playlist/${userDetails.userId}/${payload.playListId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    data: { videoId: payload.videoId }
                }).then(response => {
                    if (response.status === 200) {
                        dispatch({ type: 'REMOVE_FROM_PLAYLIST', payload: { _id: payload.playListId, data: payload.videoId } }) //<-------------------------- code on reducer (id -> _id)

                    } else {
                        throw Error
                    }
                }).catch(err => console.log(err))
                break;
            }
            case 'CHANGE_PLAYLIST_NAME': {
                await axios.patch(`https://sneaker-tv-api.herokuapp.com/playlist/${userDetails.userId}/${payload.playListId}`, {

                    newName: payload.newName
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    console.log("change playlist name: ", response)
                    if (response.status === 200) {
                        dispatch({ type: 'CHANGE_PLAYLIST_NAME', payload: { _id: payload.playListId, data: payload.newName } })

                    } else {
                        throw Error
                    }
                }).catch(err => console.log(err))
                break;
            }
            case 'DELETE_PLAYLIST': {
                await axios.delete(`https://sneaker-tv-api.herokuapp.com/playlist/${userDetails.userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    data: { playlistId: payload.playListId }
                }).then(response => {
                    if (response.status === 201) {
                        dispatch({ type: 'DELETE_PLAYLIST', payload: payload.playListId })

                    } else {
                        throw Error
                    }
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'LOGIN': {
                getData({ token: payload.token, userId: payload.userId });
                break;
            }
            case 'LOGOUT': {
                dispatch({ type: "LOGOUT" })
                setUserDetails({ token: "", userId: "" })
                break;
            }

            default: return null;
        }
    }

    const [state, dispatch] = useReducer(DataReducer, initialDataState);

    return (
        <DataContext.Provider value={{ state, dispatch, updateServer }}>
            {children}
        </DataContext.Provider>
    )
}