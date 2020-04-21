var app = getApp(); //跨页面传值
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    template.tabbar("tabBar", 1, this)

    var that = this
    wx.request({
      url: 'http://localhost:8080/rest_order/find2', //仅为示例，并非真实的接口地址
      data: {
        restId: app.appData.restInfo.restId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {

          console.log(res)

          that.setData({
            data: res.data.data
          })

          console.log(that.data[0])
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
  detail_order: function (e) {
    app.appData.orderId = e.target.dataset.order_id
    wx.navigateTo({
      url: '../rest_detail_order/rest_detail_order',
    })
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
      url: 'http://localhost:8080/rest_order/find2', //仅为示例，并非真实的接口地址
      data: {
        restId: app.appData.restInfo.restId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {

          console.log(res)

          that.setData({
            data: res.data.data
          })

          console.log(that.data[0])
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
    var that = this
    that.setData({
      data: null
    })
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

  pass: function (e) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/order/pass', //仅为示例，并非真实的接口地址
      data: {
        orderId: e.target.dataset.order_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != 0) {

          console.log(res)



          wx.request({
            url: 'http://localhost:8080/rest_order/find2', //仅为示例，并非真实的接口地址
            data: {
              restId: app.appData.restInfo.restId
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.code != 0) {

                console.log(res)

                that.setData({
                  data: res.data.data
                })

                console.log(that.data[0])
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

          wx.showToast({
            title: res.data.msg
          })

          //console.log(that.data[0])
        } else if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg
          })
        }


      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  }
})

