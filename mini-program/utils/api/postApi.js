import config from './../config.js';


const baseUrl = config.getDomain + '/api/post';
const indexListType = config.getIndexListType;

//获取首页滑动文章
const swiperPosts = baseUrl + '/swiper'

//点赞
const postLike = baseUrl + '/like'








export default{
    baseUrl:baseUrl,
    swiperPosts: swiperPosts,
    postLike: postLike
}