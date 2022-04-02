import { initialDataState } from "../Context/DataContext"

export const DataReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_VIDEOS_FROM_SERVER':
            return {
                ...state, videos: action.payload
            }
        case 'ADD_PLAYLIST_FROM_SERVER':
            return {
                ...state, playList: action.payload
            }
        case 'ADD_TO_PLAYLIST':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item._id === action.payload._id ? { ...item, list: [...item.list, action.payload.data] } : item;
                })
            }
        case 'REMOVE_FROM_PLAYLIST':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item._id === action.payload._id ? { ...item, list: item.list.filter(id => id !== action.payload.data) } : item;
                })
            }
        case 'CREATE_NEW_PLAYLIST':
            return {
                ...state,
                playList: state.playList.concat({
                    _id: action.payload.playlistId,
                    name: action.payload.name,
                    list: [action.payload.data],
                    defaultPlayList: action.payload.defaultPlayList
                })
            }
        case 'CHANGE_PLAYLIST_NAME':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item._id === action.payload._id ? { ...item, name: action.payload.data } : item;
                })
            }
        case 'DELETE_PLAYLIST':
            return {
                ...state,
                playList: state.playList.filter(item => item._id !== action.payload)
            }
        case 'ADD_TO_LIKED_VIDEOS':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item.id === "1" ? { ...item, list: [...item.list, action.payload] } : item;
                })
            }
        case 'REMOVE_FROM_LIKED_VIDEOS':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item.id === "1" ? { ...item, list: item.list.filter(id => id !== action.payload) } : item;
                })
            }
        case 'LOGOUT':
            return {
                ...initialDataState, videos: state.videos
            }
        default:
            return state;
    }
}