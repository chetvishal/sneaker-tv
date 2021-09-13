import styles from "./Login.module.css"
import { useAuthContext } from '../../Context/AuthContext';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDataContext } from "../../Context/DataContext";
import { Tv } from '../../Assets/index';

export const Login = () => {

    const { isUserLoggedIn, loginUserWithCredentials, logoutUser } = useAuthContext();
    const [errorText, setErrorText] = useState("");
    const { updateServer } = useDataContext();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isUserLoggedIn) {
            logoutUser()
        } else {
            await loginUserWithCredentials(email, password)
                .then((resp) => {
                    updateServer('LOGIN', resp)
                    navigate(state?.from && state?.from !== "/video/:id" ? state.from : '/login')
                }).catch((err) => {
                    setErrorText(err.message)
                })
        }
    }

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate('/user')
        }
    })

    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormHeading}>
                    <div className={styles.login__logo}>
                        <span className={styles.login__logoText}>Sneaker.</span>
                        <span><Tv
                            style={{ width: "4rem", height: "4rem", fill: "#909090", cursor: "pointer" }}
                            className={styles.login__logoIcon}
                        /></span>
                    </div>

                    <span className="util-heading-medium" style={{ fontWeight: "500" }}>Sign in</span>

                </div>
                <form >
                    <span className={`util-heading-small ${styles.loginInputText}`}>Username</span>
                    <input
                        type="text"
                        className={styles.loginInput}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <span className={`util-heading-small ${styles.loginInputText}`}>Password</span>
                    <input
                        type="password"
                        className={styles.loginInput}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <button
                        className="submit-button"
                        style={{ backgroundColor: "black" }}
                        onClick={handleLogin}
                    >
                        {isUserLoggedIn ? "LOGOUT" : 'LOGIN'}
                    </button>
                </form>

                <span
                    className="util-heading-small"
                    style={{ textAlign: "center", cursor: 'pointer', marginTop: "1rem" }}
                    onClick={() => {
                        setEmail("Elon")
                        setPassword("12345")
                    }}
                >Login as guest</span>
                <span className="util-heading-small" style={{ color: "red", textAlign: "center" }}>{errorText}</span>
                <span className={`util-heading-small ${styles.signUpLink}`}>
                    <Link to="/signup" className="nostyle">
                        Don't have an account yet?
                    </Link>
                </span>
            </div>
        </div>
    )
}