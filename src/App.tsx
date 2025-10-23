import {useEffect} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/home/Home.tsx'
import Navigation from "./components/navigation/Navigation.tsx";
import Footer from "./components/footer/Footer.tsx";
import Login from "./pages/login/Login.tsx";
import Profile from "./pages/profile/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {fetchUserProfile} from "./store/user.ts";

function AppInitializer() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);
    const user = useAppSelector((state) => state.user.user);

    useEffect(() => {
        if (token && !user) {
            dispatch(fetchUserProfile(token));
        }
    }, [token, user, dispatch]);

    return null;
}

export default function App() {
    return (
        <>
            <AppInitializer/>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }/>
                <Route path="/logout" element={<Home/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
            <Footer/>
        </>
    );
}
