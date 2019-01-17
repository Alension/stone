import config from '../config.js';


const baseUrl = config.getDomain + '/api/user/';


//登录
const login = baseUrl + 'login'


export default {
    login: login
}