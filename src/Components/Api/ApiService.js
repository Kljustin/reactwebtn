import axios from 'axios';
const connection = axios.create({
    
    baseURL : 'https://apirender-zol3.onrender.com',
    headers :{
        'Content-Type' : 'application/json'
    }
})
export default connection;