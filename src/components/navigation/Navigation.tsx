import './Navigation.scss';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/argentBankLogo.png';


function Navigation() {
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
                <Link className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    )
}

export default Navigation;