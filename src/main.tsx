import './sass/main.scss'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home.tsx'
import Navigation from "./components/navigation/Navigation.tsx";
import Footer from "./components/footer/Footer.tsx";
import Signin from "./pages/signin/Signin.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-in" element={<Signin/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </StrictMode>,
)
