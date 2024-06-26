import axios from 'axios';

export const axiosPublic = axios.create({
    // baseURL: 'https://wisdomwave-server-side.vercel.app'
    baseURL: 'http://localhost:5000'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;