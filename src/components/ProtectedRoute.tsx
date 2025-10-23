import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../store/hooks';
import type {ReactNode} from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const token = useAppSelector((state) => state.user.token);

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default ProtectedRoute;
