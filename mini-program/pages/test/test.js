// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterConfig: {
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
          text: '我发现了一个实惠的优惠活动，一起来参加吧',
          fontSize: 28,
          color: '#f0c2a0',
        },
        {
          x: 60,
          y: 920,
          baseLine: 'middle',
          text: "QQ浏览器抽奖得腾讯视频会员",
          fontSize: 38,
          color: 'red',
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
          text: '发现更多的一手优惠信息',
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
          url: 'http://wx2.sinaimg.cn/mw690/005AHgRNly1fyd0fr5dphj30ib0b0ah5.jpg',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onPosterSuccess(e) {
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 异步生成海报
   */
  onCreatePoster() {
    Poster.create();
  }
})