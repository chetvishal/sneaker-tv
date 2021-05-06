import { createContext, useContext, useReducer, useEffect } from 'react';
import {DataReducer} from '../Reducer/DataReducer';
// import {videos} from '../Data/Data';
import axios from 'axios';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider =({children})=> {

    useEffect(() => {
        // console.log('woah its running: ', videos)
        // dispatch({type: 'ADD_VIDEOS', payload:videos });

        async function getData() {
            await axios.get('https://salty-headland-57268.herokuapp.com/videos').then((resp) => {
                console.log('from context', resp)
                dispatch({ type: 'ADD_VIDEOS', payload: resp.data.videos });
            }).catch(err => alert('failed to fetch data from server: ', err));
        }
        getData();
    },[])

    const [state, dispatch] = useReducer(DataReducer, {
        videos: [], 
        playList: [
            {
                id: "1",
                name: "Liked videos", 
                list: [], 
                defaultPlayList: true
            },
            {
                id: "2",
                name: "Watch Later", 
                list: [], 
                defaultPlayList: true
            },
        ]
    });

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}