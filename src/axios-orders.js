import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-builder-3cd26-default-rtdb.firebaseio.com/"
})

export default instance;