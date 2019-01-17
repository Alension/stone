/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 *  *Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 * 
 */


import config from '../../utils/config.js'
import Api from "../../utils/api/api";
var util = require('../../utils/util.js');
var Auth = require('../../utils/auth.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js')

//const Zan = require('../../vendor/ZanUI/index')

var app = getApp();
let isFocusing = false
const pageCount = config.getPageCount;

import { ModalView } from '../../templates/modal-view/modal-view.js'

Page({
    data: {
        title: '文章内容',
        detail: {},
        commentsList: [],
        ChildrenCommentsList: [],
        commentCount: '',
        detailDate: '',
        commentValue: '',
        wxParseData: {},
        display: 'none',
        page: 1,
        isLastPage: false,
        parentID: "0",
        focus: false,
        placeholder: "评论...",
        postID: null,
        scrollHeight: 0,
        postList: [],
        link: '',
        dialog: {
            title: '',
            content: '',
            hidden: true
        },
        content: '',
        isShow: false,//控制menubox是否显示
        isLoad: true,//解决menubox执行一次  
        menuBackgroup: false,
        likeImag: "like.png",
        likeList: [],
        likeCount: 0,
        displayLike: 'none',
        replayTemplateId: config.getReplayTemplateId,
        toFromId: "",
        commentdate: "",
        flag: 1,
        logo: config.getLogo,
        isLoading: false,
        total_comments: 0,
        isLoginPopup: false,
        openid: "",
        userInfo: {},
        system: '',
        scrollTop:0,
        showNav:false

    },
    onLoad: function (options) {
        var self = this;
        self.fetchDetailData(options.id);
        Auth.setUserInfoData(self);
        Auth.checkLogin(self);
        wx.getSystemInfo({
            success: function (t) {
                var system = t.system.indexOf('iOS') != -1 ? 'iOS' : 'Android';
                self.setData({ system: system });

            }
        })
        new ModalView;

    },
    onPageScroll:function (e) {
        const showNav = this.data.showNav
        const self = this
        if (showNav) {
            if (e.scrollTop< 10){
                self.setData({
                    showNav: false
                })
            }
        }else{
            if (e.scrollTop > 10) {
                self.setData({
                    showNav: true
                })
            }
        }
    },
    showLikeImg: function () {
        var self = this;
        var flag = false;
        var likeUsers = self.data.detail.likeUsers;

        for (var i = 0; i < likeUsers.length; i++) {
            if (likeUsers[i].userAvatar.indexOf('wx.qlogo.cn') == -1) {
                likeUsers[i].userAvatar = "../../images/gravatar.png";
            }
        }
        self.setData({
            likeUsers: likeUsers
        });
    },
    onReachBottom: function () {
        var self = this;
        if (!self.data.isLastPage) {
            console.log('当前页' + self.data.page);
            self.fetchCommentData();
            self.setData({
                page: self.data.page + 1,
            });
        }
        else {
            console.log('评论已经是最后一页了');
        }

    },
    onShareAppMessage: function (res) {
        this.ShowHideMenu();
        console.log(res);
        return {
            title: '分享"' + config.getWebsiteName + '"的文章：' + this.data.detail.title.rendered,
            path: 'pages/detail/detail?id=' + this.data.detail.id,
            imageUrl: this.data.detail.post_thumbnail_image,
            success: function (res) {
                // 转发成功
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
                // 转发失败
            }
        }
    },
    gotowebpage: function () {
        var self = this;
        self.ShowHideMenu();
        var minAppType = config.getMinAppType;
        var url = '';
        if (minAppType == "0") {
            var url = '../webpage/webpage';
            wx.navigateTo({
                url: url + '?url=' + self.data.link
            })
        }
        else {
            self.copyLink(self.data.link);
        }

    },
    copyLink: function (url) {
        //this.ShowHideMenu();
        wx.setClipboardData({
            data: url,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: '链接已复制',
                            image: '../../images/link.png',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },
    clickLike: function (e) {
        var id = e.target.id;
        var self = this;
        if (id == 'likebottom') {
            this.ShowHideMenu();
        }

        if (self.data.openid) {
            var data = {
                openid: self.data.openid,
                postId: self.data.postID
            };
            var url = Api.postApi.postLike;
            var postLikeRequest = wxRequest.postRequest(url, data);
            postLikeRequest
                .then(response => {
                    if (response.data.status == '200') {
                        var _likeList = []
                        var _like = self.data.userInfo.avatarUrl;
                        _likeList.push(_like);
                        var tempLikeList = _likeList.concat(self.data.likeList);
                        var _likeCount = parseInt(self.data.likeCount) + 1;
                        self.setData({
                            likeList: tempLikeList,
                            likeCount: _likeCount,
                            displayLike: 'block'
                        });
                        wx.showToast({
                            title: '谢谢点赞',
                            icon: 'success',
                            duration: 900,
                            success: function () {
                            }
                        })
                    }
                    else if (response.data.status == '501') {
                        console.log(response.data.message);
                        wx.showToast({
                            title: '谢谢，已赞过',
                            icon: 'success',
                            duration: 900,
                            success: function () {
                            }
                        })
                    }
                    else {
                        console.log(response.data.message);

                    }
                    self.setData({
                        likeImag: "like-on.png"
                    });
                })
        }
        else {
            Auth.checkSession(self, 'isLoginNow');

        }
    },
    getIslike: function (result) { //判断当前用户是否点赞

       
        let openid = wx.getStorageSync('openid');

        if (openid && result.likeUsers.map((k)=>k.openid).includes(openid)) {
            this.setData({
                likeImag: "like-on.png"
            });

            console.log("已赞过");
        }


    },

    goHome: function () {
        wx.switchTab({
            url: '../index/index'
        })
    },
    praise: function () {
        this.ShowHideMenu();
        var self = this;
        var minAppType = config.getMinAppType;
        var system = self.data.system;
        if (minAppType == "0" && system == 'Android') {
            if (self.data.openid) {

                wx.navigateTo({
                    url: '../pay/pay?flag=1&openid=' + self.data.openid + '&postid=' + self.data.postID
                })
            }
            else {
                Auth.checkSession(self, 'isLoginNow');
            }
        }
        else {

            var src = config.getZanImageUrl;
            wx.previewImage({
                urls: [src],
            });

        }
    },


    //获取文章内容
    fetchDetailData: function (id) {
        var self = this;
        const url = Api.postApi.baseUrl + '/' + id;
        var getPostDetailRequest = wxRequest.getRequest(url);
        var res;
        var _displayLike = 'none';
        getPostDetailRequest
            .then(response => {
                res = response;
                const result = response.data.result
                WxParse.wxParse('article', 'html', result.postContent, self, 5);
                if (result.comments != null) {
                    self.setData({
                        commentCount: result.commentCount + "条评论"
                    });
                };
                var _likeCount = result.likeUsers.length
                if (response.data.like_count != '0') {
                    _displayLike = "block"
                }
                result.postThumbnail = config.getDomain + result.postThumbnail
                self.setData({
                    detail: result,
                    likeCount: _likeCount,
                    postID: id,
                    detailDate: result.postDate,
                    display: 'block',
                    displayLike: _displayLike,
                    total_comments: result.commentCount

                });
                return result;
            }).then(result => {//获取点赞记录
                self.showLikeImg();
                return result;
            }).then(result => {
                if (self.data.openid) {
                    Auth.checkSession(self, 'isLoginLater');
                }
                return result;
            }).then(result => {//获取是否已经点赞
                if (self.data.openid) {
                    self.getIslike(result);
                }
            })
            .catch(function (error) {
                console.log('error: ' + error);

            })



    },
    //给a标签添加跳转和复制链接事件
    wxParseTagATap: function (e) {
        var self = this;
        var href = e.currentTarget.dataset.src;
        console.log(href);
        var domain = config.getDomain;
        //可以在这里进行一些路由处理
        if (href.indexOf(domain) == -1) {
            wx.setClipboardData({
                data: href,
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            wx.showToast({
                                title: '链接已复制',
                                //icon: 'success',
                                image: '../../images/link.png',
                                duration: 2000
                            })
                        }
                    })
                }
            })
        }
        else {
            var slug = util.GetUrlFileName(href, domain);
            if (slug == 'index') {
                wx.switchTab({
                    url: '../index/index'
                })
            }
            else {
                var getPostSlugRequest = wxRequest.getRequest(Api.getPostBySlug(slug));
                getPostSlugRequest
                    .then(res => {
                        if (res.statusCode == 200) {
                            if (res.data.length != 0) {
                                var postID = res.data[0].id;
                                var openLinkCount = wx.getStorageSync('openLinkCount') || 0;
                                if (openLinkCount > 4) {
                                    wx.redirectTo({
                                        url: '../detail/detail?id=' + postID
                                    })
                                }
                                else {
                                    wx.navigateTo({
                                        url: '../detail/detail?id=' + postID
                                    })
                                    openLinkCount++;
                                    wx.setStorageSync('openLinkCount', openLinkCount);
                                }
                            }
                            else {
                                var minAppType = config.getMinAppType;
                                var url = '../webpage/webpage'
                                if (minAppType == "0") {
                                    url = '../webpage/webpage';
                                    wx.navigateTo({
                                        url: url + '?url=' + href
                                    })
                                }
                                else {
                                    self.copyLink(href);
                                }


                            }

                        }

                    }).catch(res => {
                        console.log(response.data.message);
                    })
            }
        }

    },
    //获取评论
    fetchCommentData: function () {
        var self = this;
        let args = {};
        args.postId = self.data.postID;
        args.size = pageCount;
        args.page = self.data.page;
        self.setData({ isLoading: true })
        let url = Api.commentApi.baseUrl
        url += '?postId=' + self.data.postID + '&size=' + pageCount + '&page=' + self.data.page
        var getCommentsRequest = wxRequest.getRequest(url);
        getCommentsRequest
            .then(response => {
                if (response.statusCode == 200) {
                    if (response.data.result.length < pageCount) {
                        self.setData({
                            isLastPage: true
                        });
                    }
                    if (response.data) {
                        self.setData({
                            commentsList: [].concat(self.data.commentsList, response.data.result.map((k) => {
                                k.commentDate = new Date(k.commentDate).toLocaleString()
                                return k
                            }))
                        });
                    }

                }

            })
            .catch(response => {
                console.log(response.data.message);

            }).finally(function () {

                self.setData({
                    isLoading: false
                });

            });
    },
    //显示或隐藏功能菜单
    ShowHideMenu: function () {
        this.setData({
            isShow: !this.data.isShow,
            isLoad: false,
            menuBackgroup: !this.data.false
        })
    },
    //点击非评论区隐藏功能菜单
    hiddenMenubox: function () {
        this.setData({
            isShow: false,
            menuBackgroup: false
        })
    },
    //底部刷新
    loadMore: function (e) {
        var self = this;
        if (!self.data.isLastPage) {
            self.setData({
                page: self.data.page + 1
            });
            console.log('当前页' + self.data.page);
            this.fetchCommentData();
        }
        else {
            wx.showToast({
                title: '没有更多内容',
                mask: false,
                duration: 1000
            });
        }
    },
    replay: function (e) {
        var self = this;
        var id = e.target.dataset.id;
        var name = e.target.dataset.name;
        var commentdate = e.target.dataset.commentdate;
        isFocusing = true;
        if (self.data.detail.allowComment == "1") {
            self.setData({
                parentID: id,
                placeholder: "回复" + name + ":",
                focus: true,
                commentdate: commentdate
            });

        }
        console.log('toFromId', toFromId);
        console.log('replay', isFocusing);
    },
    onReplyBlur: function (e) {
        var self = this;
        console.log('onReplyBlur', isFocusing);
        if (!isFocusing) {
            {
                const text = e.detail.value.trim();
                if (text === '') {
                    self.setData({
                        parentID: "0",
                        placeholder: "评论...",
                        commentdate: ""
                    });
                }

            }
        }
        console.log(isFocusing);
    },
    onRepleyFocus: function (e) {
        var self = this;
        isFocusing = false;
        console.log('onRepleyFocus', isFocusing);
        if (!self.data.focus) {
            self.setData({ focus: true })
        }


    },
    //提交评论
    formSubmit: function (e) {
        var self = this;
        var comment = e.detail.value.inputComment;
        var parent = self.data.parentID;
        var postID = e.detail.value.inputPostID;
        var formId = e.detail.formId;
        if (formId == "the formId is a mock one") {
            formId = "";

        }
        var commentdate = self.data.commentdate;
        if (comment.length === 0) {
            self.setData({
                'dialog.hidden': false,
                'dialog.title': '提示',
                'dialog.content': '没有填写评论内容。'

            });
        }
        else {
            if (self.data.openid) {
                var name = self.data.userInfo.nickName;
                var author_url = self.data.userInfo.avatarUrl;
                var openid = self.data.openid;
                var fromUser = self.data.userInfo.nickName;
                var data = {
                    postId: postID,
                    content: comment,
                    parent: parent,
                    openid: openid
                };
                var url = Api.commentApi.baseUrl;
                var postCommentRequest = wxRequest.postRequest(url, data);
                postCommentRequest
                    .then(res => {
                        if (res.statusCode == 200) {
                            if (res.data.code == '200') {
                                self.setData({
                                    content: '',
                                    parentID: "0",
                                    placeholder: "评论...",
                                    focus: false,
                                    commentsList: []

                                });
                                console.log(res.data.result);
                               
                                console.log(res.data.code);
                                if (parent == 0) {
                                    var commentCounts = parseInt(self.data.total_comments) + 1;
                                    self.setData({
                                        total_comments: commentCounts,
                                    });
                                }
                            }
                            else if (res.data.status == '500') {
                                self.setData({
                                    'dialog.hidden': false,
                                    'dialog.title': '提示',
                                    'dialog.content': '评论失败，请稍后重试。'

                                });
                            }
                        }
                        else {

                            if (res.data.code == 'rest_comment_login_required') {
                                self.setData({
                                    'dialog.hidden': false,
                                    'dialog.title': '提示',
                                    'dialog.content': '需要开启在WordPress rest api 的匿名评论功能！'

                                });
                            }
                            else if (res.data.code == 'rest_invalid_param' && res.data.message.indexOf('author_email') > 0) {
                                self.setData({
                                    'dialog.hidden': false,
                                    'dialog.title': '提示',
                                    'dialog.content': 'email填写错误！'

                                });
                            }
                            else {
                                console.log(res.data.code)
                                self.setData({
                                    'dialog.hidden': false,
                                    'dialog.title': '提示',
                                    'dialog.content': '评论失败,' + res.data.message

                                });
                            }
                        }
                    }).then(response => {
                        //self.fetchCommentData(self.data); 
                        self.setData(
                            {
                                page: 1,
                                commentsList: [],
                                isLastPage: false

                            }
                        )
                        self.onReachBottom();
                        //self.fetchCommentData();
                        setTimeout(function () {
                            wx.showToast({
                                title: '评论发布成功',
                                icon: 'success',
                                duration: 900,
                                success: function () {
                                }
                            })
                        }, 900);
                    }).catch(response => {
                        console.log(response)
                        self.setData({
                            'dialog.hidden': false,
                            'dialog.title': '提示',
                            'dialog.content': '评论失败,' + response

                        });
                    })
            }
            else {
                Auth.checkSession(self, 'isLoginNow');

            }

        }

    },
    agreeGetUser: function (e) {
        let self = this;
        Auth.checkAgreeGetUser(e, app, self, '0');;

    },
    closeLoginPopup() {
        this.setData({ isLoginPopup: false });
    },
    openLoginPopup() {
        this.setData({ isLoginPopup: true });
    },
    confirm: function () {
        this.setData({
            'dialog.hidden': true,
            'dialog.title': '',
            'dialog.content': ''
        })
    },
    downimageTolocal: function () {
        var self = this;
        self.ShowHideMenu();
        // wx.showLoading({
        //     title: "正在生成海报",
        //     mask: true,
        // });
        var postid = self.data.detail.id;
        var title = self.data.detail.title.rendered;
        var path = "pages/detail/detail?id=" + postid;
        var excerpt = util.removeHTML(self.data.detail.excerpt.rendered);
        var postImageUrl = "";
        var posterImagePath = "";
        var qrcodeImagePath = "";
        var flag = false;
        var imageInlocalFlag = false;
        var domain = config.getDomain;
        var downloadFileDomain = config.getDownloadFileDomain;

        var fristImage = self.data.detail.post_medium_image;

        //获取文章首图临时地址，若没有就用默认的图片,如果图片不是request域名，使用本地图片
        if (fristImage) {
            var n = 0;
            for (var i = 0; i < downloadFileDomain.length; i++) {

                if (fristImage.indexOf(downloadFileDomain[i].domain) != -1) {
                    n++;
                    break;
                }
            }
            if (n > 0) {
                imageInlocalFlag = false;
                postImageUrl = fristImage;

            }
            else {
                postImageUrl = config.getPostImageUrl;
                posterImagePath = postImageUrl;
                imageInlocalFlag = true;
            }

        }
        else {
            postImageUrl = config.getPostImageUrl;
            posterImagePath = postImageUrl;
            imageInlocalFlag = true;
        }

        console.log(postImageUrl);
        var data = {
            postid: postid,
            path: path

        };
        var url = Api.creatPoster();
        var qrcodeUrl = "";
        var posterQrcodeUrl = Api.getPosterQrcodeUrl() + "qrcode-" + postid + ".png";
        //生成二维码
        var creatPosterRequest = wxRequest.postRequest(url, data);
        creatPosterRequest.then(response => {
            if (response.statusCode == 200) {
                if (response.data.status == '200') {
                    const downloadTaskQrcodeImage = wx.downloadFile({
                        url: posterQrcodeUrl,
                        success: res => {
                            if (res.statusCode === 200) {
                                qrcodeImagePath = res.tempFilePath;
                                console.log("二维码图片本地位置：" + res.tempFilePath);
                                if (!imageInlocalFlag) {
                                    const downloadTaskForPostImage = wx.downloadFile({
                                        url: postImageUrl,
                                        success: res => {
                                            if (res.statusCode === 200) {
                                                posterImagePath = res.tempFilePath;
                                                console.log("文章图片本地位置：" + res.tempFilePath);
                                                flag = true;
                                                if (posterImagePath && qrcodeImagePath) {
                                                    self.createPosterLocal(posterImagePath, qrcodeImagePath, title, excerpt);
                                                }
                                            }
                                            else {
                                                console.log(res);
                                                wx.hideLoading();
                                                wx.showToast({
                                                    title: "生成海报失败...",
                                                    mask: true,
                                                    duration: 2000
                                                });
                                                return false;


                                            }
                                        }
                                    });
                                    downloadTaskForPostImage.onProgressUpdate((res) => {
                                        console.log('下载文章图片进度：' + res.progress)

                                    })
                                }
                                else {
                                    if (posterImagePath && qrcodeImagePath) {
                                        self.createPosterLocal(posterImagePath, qrcodeImagePath, title, excerpt);
                                    }
                                }
                            }
                            else {
                                console.log(res);
                                //wx.hideLoading();
                                flag = false;
                                wx.showToast({
                                    title: "生成海报失败...",
                                    mask: true,
                                    duration: 2000
                                });
                                return false;
                            }
                        }
                    });
                    downloadTaskQrcodeImage.onProgressUpdate((res) => {
                        console.log('下载二维码进度', res.progress)
                    })
                }
                else {
                    console.log(response);
                    //wx.hideLoading();
                    flag = false;
                    wx.showToast({
                        title: "生成海报失败...",
                        mask: true,
                        duration: 2000
                    });
                    return false;
                }
            }
            else {
                console.log(response);
                //wx.hideLoading();
                flag = false;
                wx.showToast({
                    title: "生成海报失败...",
                    mask: true,
                    duration: 2000
                });
                return false;
            }

        });


    },
    //将canvas转换为图片保存到本地，然后将路径传给image图片的src
    createPosterLocal: function (postImageLocal, qrcodeLoal, title, excerpt) {
        var that = this;
        wx.showLoading({
            title: "正在生成海报",
            mask: true,
        });
        var context = wx.createCanvasContext('mycanvas');
        context.setFillStyle('#ffffff');//填充背景色
        context.fillRect(0, 0, 600, 970);
        context.drawImage(postImageLocal, 0, 0, 600, 400);//绘制首图
        context.drawImage(qrcodeLoal, 210, 670, 180, 180);//绘制二维码
        //context.drawImage(that.data.logo, 350, 740, 130, 130);//画logo
        //const grd = context.createLinearGradient(30, 690, 570, 690)//定义一个线性渐变的颜色
        //grd.addColorStop(0, 'black')
        //grd.addColorStop(1, '#118fff')
        //context.setFillStyle(grd)
        context.setFillStyle("#959595");
        context.setFontSize(20);
        context.setTextAlign('center');
        context.fillText("阅读文章，请长按识别二维码", 300, 900);
        //context.setStrokeStyle(grd)
        context.setFillStyle("#959595");
        // context.beginPath()//分割线
        // context.moveTo(30, 690)
        // context.lineTo(570, 690)
        // context.stroke();
        // this.setUserInfo(context);//用户信息        
        util.drawTitleExcerpt(context, title, excerpt);//文章标题
        context.draw();
        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        setTimeout(function () {
            wx.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: function (res) {
                    var tempFilePath = res.tempFilePath;
                    // that.setData({
                    //     imagePath: tempFilePath,
                    //     maskHidden: "none"
                    // });
                    wx.hideLoading();
                    console.log("海报图片路径：" + res.tempFilePath);
                    that.modalView.showModal({
                        title: '保存至相册可以分享到朋友圈',
                        confirmation: false,
                        confirmationText: '',
                        inputFields: [{
                            fieldName: 'posterImage',
                            fieldType: 'Image',
                            fieldPlaceHolder: '',
                            fieldDatasource: res.tempFilePath,
                            isRequired: false,
                        }],
                        confirm: function (res) {
                            console.log(res)
                            //用户按确定按钮以后会回到这里，并且对输入的表单数据会带回
                        }
                    })


                },
                fail: function (res) {
                    console.log(res);
                }
            });
        }, 900);
    }
})