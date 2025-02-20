import axios from "axios";

export const getToken = async (username, password) => {
    const data = new URLSearchParams({
        grant_type: `${import.meta.env.VITE_OAUTH_GRANT_TYPE}`,
        client_id: `${import.meta.env.VITE_OAUTH_CLIENT_ID}`,
        client_secret: `${import.meta.env.VITE_OAUTH_CLIENT_SECRET}`,
        username: username,
        password: password
    });
    return await axios.post(`${import.meta.env.VITE_LOGIN_URL}`, data)
        .then(res => res.data);
}
