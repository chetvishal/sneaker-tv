import { useParams } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';
import Loading from '../../Assets/3.gif';
import { PlayList } from '../../Components/index'

export const PlaylistPg = () => {
    const { state } = useDataContext();
    const { playlistId } = useParams();
    const { videos, playList } = state;


    const findPlaylist = () => {
        const obj = playList.find(i => i._id === playlistId);
        return obj
    }

    const filterPlayListVideo = (videoList, PlayListIdList) => {
        const data = [];
        videoList.map(i => {
            const findItem = PlayListIdList.find(item => item === i.vidId)
            if (findItem) { return data.push(i) } else return 1
        })
        return data;
    }

    const playlistObj = findPlaylist()
    const { list } = playlistObj ? playlistObj : false;

    const playlist = list ? filterPlayListVideo(videos, list) : [];

    return (
        playlist.length === 0 && playlistObj === undefined ?
            <div>
                <img src={Loading} alt="loading" />
            </div>
            :
            <div>
                <PlayList data={playlistObj} hideNavigate={true} />
            </div>
    )
}