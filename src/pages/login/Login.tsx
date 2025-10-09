import './Login.scss';
import {UserService} from "../../services/UserService.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/user.ts";

function Login() {

    const [userEmail, setUserEmail] = useState<string | undefined>();
    const [userPassword, setUserPassword] = useState<string | undefined>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        if (userEmail && userPassword) {
            await UserService().login({email: userEmail, password: userPassword}).then(async (token) => {
                await UserService().searchProfile(token).then((response) => {
                    dispatch(setUser(response));
                    navigate('/profile');
                })
            })
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input name="username" type="text" id="username" onChange={(e) => {
                            setUserEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" id="password" onChange={(e) => {
                            setUserPassword(e.target.value)
                        }}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <a onClick={() => onSubmit()} className="sign-in-button">Sign In</a>
                </form>
            </section>
        </main>
    )
}

export default Login;