import './Login.scss';
import {useState, useEffect, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {loginAndFetchProfile} from "../../store/user";

function Login() {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {status, error} = useAppSelector((state) => state.user);

    useEffect(() => {
        const rememberMePreference = localStorage.getItem('rememberMe');
        if (rememberMePreference !== null) {
            setRememberMe(rememberMePreference === 'true');
        } else {
            localStorage.setItem('rememberMe', 'true');
        }
    }, []);

    const onSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (userEmail && userPassword) {
            const currentRememberMe = localStorage.getItem('rememberMe');
            const rememberMeChanged = currentRememberMe !== rememberMe.toString();

            localStorage.setItem('rememberMe', rememberMe.toString());

            const result = await dispatch(loginAndFetchProfile({
                email: userEmail,
                password: userPassword
            }));

            if (loginAndFetchProfile.fulfilled.match(result)) {
                if (rememberMeChanged) {
                    window.location.href = '/profile';
                } else {
                    navigate('/profile');
                }
            }
        }
    }, [userEmail, userPassword, rememberMe, dispatch, navigate]);

    const isLoading = useMemo(() => status === 'loading', [status]);
    const isFormValid = useMemo(() =>
            userEmail.trim().length > 0 && userPassword.length > 0,
        [userEmail, userPassword]
    );

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={onSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            name="username"
                            type="text"
                            id="username"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            autoComplete="username"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isLoading}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error && <div className="error-message" style={{color: 'red', marginTop: '10px'}}>{error}</div>}
                    <button
                        type="submit"
                        className="sign-in-button"
                        disabled={isLoading || !isFormValid}
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;