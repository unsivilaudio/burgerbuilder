import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-ac7f5.firebaseio.com/',
});

export default instance;
