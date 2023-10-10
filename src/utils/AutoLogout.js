import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/user";

const AutoLogout = ({ children }) => {
    const logoutTimerRef = useRef(null);
    const dispatch = useDispatch();

    function deleteAllCookies() {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const handleLogout = () => {
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        deleteAllCookies();
        dispatch(logout());
        window.location.reload();
    };

    const startLogoutTimer = () => {

        logoutTimerRef.current = setTimeout(() => {
            alert('You have been logged out due to inactivity');
            handleLogout();
        }, 60000 * 15);
    };

    const resetLogoutTimer = () => {
        clearTimeout(logoutTimerRef.current);
        startLogoutTimer();
    };

    useEffect(() => {
        // Initialize the logout timer when the component mounts
        startLogoutTimer();

        // Add event listeners for user activity
        window.addEventListener('mousemove', resetLogoutTimer);
        window.addEventListener('mousedown', resetLogoutTimer);
        window.addEventListener('keypress', resetLogoutTimer);
        window.addEventListener('touchmove', resetLogoutTimer);
        window.addEventListener('onscroll', resetLogoutTimer);

        return () => {
            // Cleanup timers and event listeners when the component unmounts
            clearTimeout(logoutTimerRef.current);
            window.removeEventListener('mousemove', resetLogoutTimer);
            window.removeEventListener('mousedown', resetLogoutTimer);
            window.removeEventListener('keypress', resetLogoutTimer);
            window.removeEventListener('touchmove', resetLogoutTimer);
            window.removeEventListener('onscroll', resetLogoutTimer);
        };
    }, []);

    return <>{children}</>;
};

export default AutoLogout;
