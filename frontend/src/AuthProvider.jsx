import { useState, createContext } from "react";
import { getToken } from "./api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (username, password) => {
        return await getToken(username, password)
            .then(data => {
                setToken(data);
                localStorage.setItem("token", data);
            })
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
