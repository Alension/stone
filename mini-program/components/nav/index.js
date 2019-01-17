// components/component-tag-name.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       
    },

    /**
     * 组件的初始数据
     */
    data: {
       
    },

    /**
     * 组件的方法列表
     */
    methods: {
        go_home:function () {
            wx.switchTab({
                url: '/pages/index/index'
            })
        },
        go_top:function () {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 500
            })
        }
    }
})
