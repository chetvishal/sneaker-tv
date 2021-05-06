import { v4 as uuidv4 } from 'uuid';

export const DataReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_VIDEOS':
            return {
                ...state, videos: action.payload
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
        case 'ADD_TO_PLAYLIST':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item.id === action.payload.id ? { ...item, list: [...item.list, action.payload.data] } : item;
                })
            }
        case 'REMOVE_FROM_PLAYLIST':
            return {
                ...state,
                playList: state.playList.map(item => {
                    return item.id === action.payload.id ? { ...item, list: item.list.filter(id => id !== action.payload.data) } : item;
                })
            }
        case 'CREATE_NEW_PLAYLIST':
            return {
                ...state,
                playList: state.playList.concat({
                    id: uuidv4(),
                    name: action.payload.name,
                    list: [action.payload.data],
                    defaultPlayList: false
                })
            }
        case 'CHANGE_PLAYLIST_NAME': 
            return {
                ...state, 
                playList: state.playList.map(item => {
                    return item.id === action.payload.id ? { ...item, name: action.payload.data } : item;
                })
            }
        case 'DELETE_PLAYLIST': 
            return {
                ...state, 
                playList: state.playList.filter(item => item.id !== action.payload)
            }
        default:
            return state;
    }
}