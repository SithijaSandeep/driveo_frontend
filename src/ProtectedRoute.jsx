// src/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export const ManagerRoute = ({ children }) => {
    // localStorage එකේ අපි සේව් කරපු 'auth' විස්තර තියෙනවද බලනවා
    const authData = localStorage.getItem('auth');
    const auth = authData ? JSON.parse(authData) : null;

    // ලොග් වී ඇත්නම් සහ ඔහුගේ role එක manager නම් පමණක් ඇතුලට යාමට ඉඩ දෙන්න
    if (auth && auth.role === 'manager') {
        return children;
    }

    // නැතිනම් නැවත ලොගින් පේජ් එකට හරවා යවන්න
    return <Navigate to="/manager/login" />;
};