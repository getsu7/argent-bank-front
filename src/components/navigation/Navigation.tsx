import './Navigation.scss';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logoImg from '../../assets/argentBankLogo.png';
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import type {User} from "../../models/UserTypes.ts";
import type {UserState} from "../../store/user.ts";
import {clearUser} from "../../store/user.ts";


function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userStore = useSelector((state: UserState) => state.user);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (userStore.user) {
            setUser(userStore.user);
        }
    }, [userStore.user]);

    const handleLogout = () => {
        dispatch(clearUser());
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