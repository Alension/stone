/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 * 
 */

import Api from "../../utils/api/api";
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js')
var Auth = require('../../utils/auth.js');
var common = require('../../utils/common.js');
import config from '../../utils/config.js'
var app = getApp();


Page({

    data:{
        siteInfo:{},
        apps: []
    },
    
    onLoad:function (option) {
        const self = this;
        const url = Api.userApi.siteInfo;
        const siteInfoRequest = wxRequest.getRequest(url);
        siteInfoRequest.then(response=>{
            if (response.statusCode == 200) {
                self.setData({
                    siteInfo:response.data.result,
                    apps: config.getApps
                })
            }
        })
        
    },

    redict: function (e) {
        common.redict(e)
    },

    copyLink: function (e) {
        //this.ShowHideMenu();
        wx.setClipboardData({
            data: e.target.dataset.url,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: e.target.dataset.desc,
                            image: '../../images/link.png',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },
  
})