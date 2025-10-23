import './Navigation.scss';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logoImg from '../../assets/argentBankLogo.png';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {clearUser} from "../../store/user";
import {persistor} from "../../store/store";


function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);

    const handleLogout = () => {
        dispatch(clearUser());
        persistor.purge();
        navigate('/');
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    alt="Argent Bank Logo"
                    className="main-nav-logo-image"
                    src={logoImg}
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {(location.pathname !== '/login' && !user?.firstName) && (
                    <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}

                {user?.firstName && (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </Link>

                        <a className="main-nav-item" onClick={handleLogout} style={{cursor: 'pointer'}}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navigation;