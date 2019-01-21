/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 */



//配置域名,域名只修改此处。
var DOMAIN = "https://alension.top";
//API token
const TOKEN = "3f85d4962655a5bfb8141632762abf8d"
//小程序的类型，如果是企业小程序请填：0 ，如果是个人小程序请填：1
var MINAPPTYPE = "1";
//网站名称
var WEBSITENAME = "Alension"; 
 //每页文章数目
var PAGECOUNT = '10';
//专题页显示全部的分类
var CATEGORIESID = 'all';  
//微信鼓励的图片链接，用于个人小程序的赞赏
var ZANIMAGEURL = 'https://www.watch-life.net/images/2017/07/zsm400.jpg';
//首页显示所有分类
var INDEXLISTTYPE = "all"; 
//鼓励消息模版id
var PAYTEMPPLATEID = 'hzKpxuPF2rw7O-qTElkeoE0lMwr0O4t9PJkLyt6v8rk';
//回复评论消息模版id
var REPLAYTEMPPLATEID = 'IiAVoBWP34u1uwt801rI_Crgen7Xl2lvAGP67ofJLo8';
// 网站的logo图片
var LOGO = "../../images/logo-icon.png"; 
//生成海报如果没有首图，使用此处设置的图片作为海报图片。
var POSTERIMGURL = "/images/default-poster.jpg"; 
//海报中小程序二维码
var POSTERQRCODE = "https://wx-lx-shop.oss-cn-beijing.aliyuncs.com/stone/gh_140ab523e0a5_258%20%282%29.jpg"; 

//此处设置的域名和小程序与小程序后台设置的downloadFile合法域名要一致。
var DOWNLOADFILEDOMAIN = [
  { id: 1, domain: 'alension.top' }
];
//首页图标导航
//参数说明：'name'为名称，'image'为图标路径，'url'为跳转的页面，'redirecttype'为跳转的类型，apppage为本小程序的页面，miniapp为其他微信小程序,webpage为web-view的页面
//redirecttype 是 miniapp 就是跳转其他小程序  url 为其他小程序的页面
//redirecttype 为 apppage 就是跳转本小程序的页面，url为本小程序的页面路径
//redirecttype 为 webpage 是跳转网址，是通过web-view打开网址，url就是你要打开的网址，不过这个网址的域名要是业务域名
//'appid' 当redirecttype为miniapp时，这个值为其他微信小程序的appid，如果redirecttype为apppage，webpage时，这个值设置为空。
//'extraData'当redirecttype为miniapp时，这个值为提交到其他微信小程序的参数，如果redirecttype为apppage，webpage时，这个值设置为空。
var INDEXNAV = [
  { id: '1', name: '大牌', image: '../../images/nav-icon1-major.png', url: 'pages/index/index', redirecttype: 'miniapp', appid: 'wx074a216a7aabc30c', extraData: '' },
  { id: '2', name: '信用卡', image: '../../images/nav-icon2-credit.png', url: 'pages/index/index', redirecttype: 'miniapp', appid: 'wxc1771b619b83316b', extraData: '' },
  { id: '3', name: '游戏', image: '../../images/nav-icon3-game.png', url: 'pages/index/index', redirecttype: 'miniapp', appid: 'wxa43aaa8416cdbd61', extraData: '' },
  { id: '4', name: '网赚', image: '../../images/nav-icon4-money.png', url: 'pages/index/index', redirecttype: 'miniapp', appid: 'wxe9440e3d24b04152', extraData: '' },
  { id: '5', name: '投稿', image: '../../images/nav-icon5-other.png', url: 'pages/shelf/shelf', redirecttype: 'miniapp', appid: 'wx55ea6098e41af5c4', extraData: '' }
  // { id: '6', name: '教程', image: '../../images/app.png', url: '../../pages/list/list?categoryID=1059', redirecttype: 'apppage', appid: '', extraData: ''}

];


const APPS = [
  { id: '1', name: '颜值在线打分', image: '../../images/20181219170216.gif', url: 'pages/scanFace/scanFace', redirecttype: 'miniapp', appid: 'wxab710632be50578a', extraData: '' }
];

//海报生成模板
const POSTERTEMPLATE = {
  width: 750,
  height: 1334,
  backgroundColor: '#fff',
  debug: false,
  blocks: [
    {
      width: 690,
      height: 808,
      x: 30,
      y: 183,
      borderWidth: 2,
      borderColor: '#f0c2a0',
      borderRadius: 20,
    },
    {
      width: 634,
      height: 74,
      x: 59,
      y: 770,
      backgroundColor: '#fff',
      opacity: 0.5,
      zIndex: 100,
    },
  ],
  texts: [
    {
      x: 113,
      y: 61,
      baseLine: 'middle',
      text: '伟仔',
      fontSize: 32,
      color: '#8d8d8d',
    },
    {
      x: 30,
      y: 113,
      baseLine: 'top',
      text: '发现一个好物，推荐给你呀',
      fontSize: 38,
      color: '#080808',
    },
    {
      x: 92,
      y: 810,
      fontSize: 38,
      baseLine: 'middle',
      text: '标题标题标题标题标题标题标题标题标题',
      width: 570,
      lineNum: 1,
      color: '#8d8d8d',
      zIndex: 200,
    },
    {
      x: 59,
      y: 895,
      baseLine: 'middle',
      text: [
        {
          text: '2人拼',
          fontSize: 28,
          color: '#ec1731',
        },
        {
          text: '¥99',
          fontSize: 36,
          color: '#ec1731',
          marginLeft: 30,
        }
      ]
    },
    {
      x: 522,
      y: 895,
      baseLine: 'middle',
      text: '已拼2件',
      fontSize: 28,
      color: '#929292',
    },
    {
      x: 59,
      y: 945,
      baseLine: 'middle',
      text: [
        {
          text: '商家发货&售后',
          fontSize: 28,
          color: '#929292',
        },
        {
          text: '七天退货',
          fontSize: 28,
          color: '#929292',
          marginLeft: 50,
        },
        {
          text: '运费险',
          fontSize: 28,
          color: '#929292',
          marginLeft: 50,
        },
      ]
    },
    {
      x: 360,
      y: 1065,
      baseLine: 'top',
      text: '长按识别小程序码',
      fontSize: 38,
      color: '#080808',
    },
    {
      x: 360,
      y: 1123,
      baseLine: 'top',
      text: '超值好货一起拼',
      fontSize: 28,
      color: '#929292',
    },
  ],
  images: [
    {
      width: 62,
      height: 62,
      x: 30,
      y: 30,
      borderRadius: 62,
      url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/02bb99132352b5b5dcea.jpg',
    },
    {
      width: 634,
      height: 634,
      x: 59,
      y: 210,
      url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/193256f45999757701f2.jpeg',
    },
    {
      width: 220,
      height: 220,
      x: 92,
      y: 1020,
      url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/d719fdb289c955627735.jpg',
    }

  ]

}

export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,
  getPayTemplateId: PAYTEMPPLATEID,
  getPageCount: PAGECOUNT,
  getCategoriesID: CATEGORIESID,
  getIndexNav: INDEXNAV,
  getReplayTemplateId: REPLAYTEMPPLATEID,
  getMinAppType: MINAPPTYPE,
  getZanImageUrl: ZANIMAGEURL,
  getIndexListType: INDEXLISTTYPE,
  getLogo: LOGO,
  getPostImageUrl: POSTERIMGURL,
  getDownloadFileDomain: DOWNLOADFILEDOMAIN,
  getApps: APPS,
  getPosterTemplate: POSTERTEMPLATE,
  token: TOKEN,
  posertQrCode: POSTERQRCODE
}