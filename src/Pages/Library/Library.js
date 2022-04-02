import { PlayList } from '../../Components/index';
import { useDataContext } from '../../Context/DataContext';
import { WatchVideo } from '../../Assets/index';
import { useNavigate } from "react-router-dom";
import styles from './Library.module.css';

export const Library = () => {

    const navigate = useNavigate()
    const { state } = useDataContext();
    const { playList } = state;

    return (
        <div className="library">
            {playList.length !== 0 ? playList.map((item) => {
                return <PlayList data={item} key={item.name} />
            }) :
                <div className={styles.empty__library}>
                    <span className={styles.empty__libraryText}> Your library is empty</span>
                    <button className={`submit-button ${styles.submitButton}`}
                        onClick={() => navigate('/')}
                    >Checkout Videos</button>
                    <div className="empty__libraryImage">
                        <WatchVideo className={styles.empty__libraryImage} />
                    </div>
                </div>
            }
        </div>
    )
}