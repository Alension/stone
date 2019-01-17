import config from '../config.js';


const baseUrl = config.getDomain + '/api/user';


//登录
const login = baseUrl + '/login'

const siteInfo = baseUrl + '/siteInfo'


export default {
    login: login,
    siteInfo: siteInfo
}