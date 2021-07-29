import styles from './User.module.css'
import { useAuthContext } from '../../Context/AuthContext';
import { useDataContext } from '../../Context/DataContext';
import { useNavigate } from "react-router-dom";
import { Home, RedHeart, Playlist3, Clock} from '../../Assets/index';

export const User = () => {
    const { logoutUser, userDetails } = useAuthContext();
    const { updateServer, state } = useDataContext();
    const { playList } = state;
    const navigate = useNavigate()
    const logoutHandler = () => {
        logoutUser()
        updateServer("LOGOUT")
    }
    return (
        <div className={styles.user}>
            <div className={styles.userContainer}>
                <div className={styles.userContainerHeading}>
                    <span className={`util-heading-medium ${styles.userName}`}>Hi {userDetails.username}</span>
                </div>
                <div className={styles.userActionList}>
                    <div className={styles.userActionBtn} onClick={() => navigate('/')}>
                        <Home className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Home</span>
                    </div>
                    <div className={styles.userActionBtn} onClick={() => navigate(`${playList.length !== 0 ? `/library/${playList[1]._id}` : `/library`}`)}>
                        <RedHeart className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Liked Videos</span>
                    </div>
                    <div className={styles.userActionBtn} onClick={() => navigate('/library')}>
                        <Playlist3 className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Playlist</span>
                    </div>
                    <div className={styles.userActionBtn} onClick={() => navigate(`${playList.length !== 0 ? `/library/${playList[0]._id}` : `/library`}`)}>
                        <Clock className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Watch Later</span>
                    </div>
                </div>
                <button
                    className={`submit-button ${styles.signupSubmitBtn}`}
                    style={{ backgroundColor: "black" }}
                    onClick={logoutHandler}
                >LOGOUT</button>
            </div>
        </div>
    )
}