import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true 
});

export async function checkAuth() {
    try {
        const response = await axiosInstance.get('/checkauth');
        if (response.status === 200) {
           return true;
        }
    } catch (error) {
        console.error("Authentication check failed:", error.response || error);
        return false;
    }
}
