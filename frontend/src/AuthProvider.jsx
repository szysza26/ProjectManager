import { useState, useEffect, createContext } from "react";
import { getTokenByPassword, getTokenByRefreshToken } from "./api/auth";
import { jwtDecode } from "jwt-decode";
import ModalCircularProgress from "./components/ModalCircularProgress";
import LoginPage from "./components/LoginPage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [isRefreshingToken, setIsRefreshingToken] = useState(true);

    const login = async (username, password) => {
        return await getTokenByPassword(username, password)
            .then(data => {
                setToken(data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            })
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("refresh_token");
    };

    useEffect(() => {
        const refreshToken = localStorage.getItem("refresh_token");

        if(!refreshToken){
            setIsRefreshingToken(false);
            return;
        }

        getTokenByRefreshToken(refreshToken)
            .then(data => {
                setToken(data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            })
            .catch(() => {
                logout();
            })
            .finally(() => {
                setIsRefreshingToken(false);
            })
    }, [])

    useEffect(() => {
        const refreshToken = localStorage.getItem("refresh_token");
        if(!token || !refreshToken)
            return;

        const decodedJwt = jwtDecode(token);

        const actual = new Date().getTime() / 1000;
        const exp = decodedJwt.exp;
        const refreshAfter = Math.round((exp - actual) - 60);

        if(refreshAfter < 0) {
            logout();
            return;
        }

        const timeout = setTimeout(() => {
            getTokenByRefreshToken(refreshToken)
                .then(data => {
                    setToken(data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                })
                .catch(() => {
                    logout();
                })
        }, refreshAfter * 1000);

        return () => {
            clearTimeout(timeout);
        }

    }, [token])

    return (
        <AuthContext.Provider value={{ login, logout, token }}>
            {isRefreshingToken ? 
                <ModalCircularProgress
                    isOpen={true}
                />
            :
                token ?
                    children
                :
                    <LoginPage />
            }
        </AuthContext.Provider>
    );
};
