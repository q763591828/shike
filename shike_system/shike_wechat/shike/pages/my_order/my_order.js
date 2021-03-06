var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp(); //跨页面传值

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    search_data:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['小龙虾', '回锅肉', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);


    wx.request({
      url: 'http://localhost:8080/user_order/find', //仅为示例，并非真实的接口地址
      data: {
        userId: app.appData.userId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {

          that.setData({
            data: res.data.data
          })

          console.log(that.data)
        } else if (res.data.code == 0) {
          wx.showToast({
            title: '失败'
          })
        }


      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);

    console.log(that.data.search_data);

    wx.request({
      url: 'http://localhost:8080/user_order/searchOrder', //仅为示例，并非真实的接口地址
      data: {
        user_id: app.appData.userId,
        cai_name: that.data.search_data
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {

          //console.log(res)
          that.setData({
            data: res.data.data
          })

          //console.log(that.data)
        } else if (res.data.code == 0) {
          wx.showToast({
            title: '失败'
          })
        }


      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    console.log(e);
    that.setData({
      search_data:e.detail.value
    })

  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
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
    var that = this
    wx.request({
      url: 'http://localhost:8080/user_order/find', //仅为示例，并非真实的接口地址
      data: {
        userId: app.appData.userId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {

          //console.log(res)
          that.setData({
            data: res.data.data
          })

          //console.log(that.data)
        } else if (res.data.code == 0) {
          wx.showToast({
            title: '失败'
          })
        }


      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
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
  delete_order: function (e) {
    var that = this;
    console.log(e);
    console.log(e.target.dataset.order_id)
    wx.request({
      url: 'http://localhost:8080/user_order/delete', //仅为示例，并非真实的接口地址
      data: {
        now_number: e.target.dataset.now_number,
        user_id: app.appData.userId,
        order_id: e.target.dataset.order_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {


          wx.request({
            url: 'http://localhost:8080/user_order/find', //仅为示例，并非真实的接口地址
            data: {
              userId: app.appData.userId
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.code != 0) {

                //console.log(res)
                that.setData({
                  data: res.data.data
                })

                //console.log(that.data)
              } else if (res.data.code == 0) {
                wx.showToast({
                  title: '失败'
                })
              }


            },
            fail: function (res) {
              console.log(".....fail.....");
            }
          })
          

        } else if (res.data.code == 0) {
          wx.showToast({
            title: '失败'
          })
        }


      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },

  order_detail:function(e){
    //console.log(e.target.dataset.order_id)
    //console.log(app.appData.orderId)
    app.appData.orderId = e.target.dataset.order_id
    wx.navigateTo({
      url: '../detail_order/detail_order',
    })
  },

})