/*
 * @Author: Alen 
 * @Date: 2018-12-20 11:55:12 
 * @Last Modified by: Alen
 * @Last Modified time: 2019-01-16 16:59:00
 */


import config from './config.js'

function redict(e) {
    // console.log('查看文章');
    var id = e.currentTarget.id;
    var redicttype = e.currentTarget.dataset.redicttype;
    var url = e.currentTarget.dataset.url == null ? '' : e.currentTarget.dataset.url;
    var appid = e.currentTarget.dataset.appid == null ? '' : e.currentTarget.dataset.appid;

    if (redicttype == 'category')//跳转至某分类下的文章列表
    {
        const name = e.currentTarget.dataset.name;
        const desc = e.currentTarget.dataset.desc;
        var url = '../list/list?categoryID=' + id + '&name=' + name + '&desc=' +desc;
        wx.navigateTo({
            url: url
        })
    }
    if (redicttype == 'detailpage')//跳转到内容页
    {
        url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url: url
        })
    }
    if (redicttype == 'apppage') {//跳转到小程序内部页面         
        wx.navigateTo({
            url: url
        })
    }
    else if (redicttype == 'webpage')//跳转到web-view内嵌的页面
    {
        url = '../webpage/webpage?url=' + url;
        wx.navigateTo({
            url: url
        })
    }
    else if (redicttype == 'miniapp')//跳转到其他app
    {
        wx.navigateToMiniProgram({
            appId: appid,
            envVersion: 'release',
            path: url,
            success(res) {
                // 打开成功
            },
            fail: function (res) {
                console.log(res);
            }
        })
    }
}

function genePosterData(data)  {
    let template = config.getPosterTemplate;
    template.texts[0].text = data.username;
    template.texts[1].text = data.title;
}

module.exports = {
    redict: redict,
    genePosterData: genePosterData
}

