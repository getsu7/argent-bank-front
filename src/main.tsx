import './sass/main.scss'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx'
import Navigation from "./components/navigation/Navigation.tsx";
import Footer from "./components/footer/Footer.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<App/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </StrictMode>,
)
