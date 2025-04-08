import axios from 'axios';
const connection = axios.create({
    baseURL : 'http://apiwebtnghiem.infy.uk',
    headers :{
        'Content-Type' : 'application/json'
    }
})
export default connection;