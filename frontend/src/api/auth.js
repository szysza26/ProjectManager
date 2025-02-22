import axios from "axios";

export const getTokenByPassword = async (username, password) => {
    const data = new URLSearchParams({
        client_id: `${import.meta.env.VITE_OAUTH_CLIENT_ID}`,
        client_secret: `${import.meta.env.VITE_OAUTH_CLIENT_SECRET}`,
        grant_type: "password",
        username: username,
        password: password
    });
    return await axios.post(`${import.meta.env.VITE_LOGIN_URL}`, data)
        .then(res => res.data);
}

export const getTokenByRefreshToken = async (refreshToken) => {
    const data = new URLSearchParams({
        client_id: `${import.meta.env.VITE_OAUTH_CLIENT_ID}`,
        client_secret: `${import.meta.env.VITE_OAUTH_CLIENT_SECRET}`,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    });
    return await axios.post(`${import.meta.env.VITE_LOGIN_URL}`, data)
        .then(res => res.data);
}
