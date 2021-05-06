import { PlayList } from '../../Components/index';
import { useDataContext } from '../../Context/DataContext';

export const Library = () => {

    const { state } = useDataContext();
    const { playList } = state;
    console.log(state.playList)

    return (
        <div className="library">
            {playList && playList.map((item, index) => {
                return <PlayList data={item} key={item.name} />
            })}
        </div>
    )
}