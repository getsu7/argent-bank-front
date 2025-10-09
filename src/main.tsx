import './sass/main.scss'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home.tsx'
import Navigation from "./components/navigation/Navigation.tsx";
import Footer from "./components/footer/Footer.tsx";
import Login from "./pages/login/Login.tsx";
import Profile from "./pages/profile/Profile.tsx";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store.ts";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/logout" element={<Home/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>,
)
