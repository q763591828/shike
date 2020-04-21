var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-09-01',
    time: '00:00',
    modalHidden2: true,
    modalHidden: true,
    title: null,
    address: null,
    telephone: null,
    sum_number: null,
    order_id: null,
    caiName: null,
    price: null,
    transmit: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.appData.orderId)
    var that = this
    wx.request({
      url: 'http://localhost:8080/rest_order/findRestByOrderId', //仅为示例，并非真实的接口地址
      data: {
        orderId: app.appData.orderId,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        console.log(res.data.data[0])

        if (res.data.code == 1) {
          that.setData({
            title: res.data.data[0].title,
            address: res.data.data[0].address,
            telephone: res.data.data[0].telephone
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

    wx.request({
      url: 'http://localhost:8080/order/findOrderInfo', //仅为示例，并非真实的接口地址
      data: {
        orderId: app.appData.orderId,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        console.log(res)

        if (res.data.code == 1) {
          that.setData({
            sum_number: res.data.data.sum_number,
            order_id: res.data.data.order_id
          })

          wx.request({
            url: 'http://localhost:8080/cai/findCaiInfo', //仅为示例，并非真实的接口地址
            data: {
              orderId: app.appData.orderId,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {

              console.log(res)

              if (res.data.code == 1) {
                that.setData({
                  caiName: res.data.data.caiName,
                  price: res.data.data.price
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

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formReset: function () {
    //console.log('form发生了reset事件');
    this.modalTap2();
  },
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this

    var caiName = "transmit.caiName"
    var price = "transmit.price"
    var sum_number = "transmit.sum_number"
    var time = "transmit.time"
    var date = "transmit.date"

    if (e.detail.value.caiName != "") {

      that.setData({
        [caiName]: e.detail.value.caiName
      })
    }

    if (e.detail.value.price != "") {
      that.setData({
        [price]: e.detail.value.price
      })

    }
    if (e.detail.value.sum_number != "") {
      that.setData({
        [sum_number]: e.detail.value.sum_number
      })

    }
    if (e.detail.value.time != "") {
      that.setData({
        [time]: e.detail.value.time
      })

    }
    if (e.detail.value.date != "") {
      that.setData({
        [date]: e.detail.value.date
      })

    }

    console.log(that.data.transmit)

    wx.request({
      url: 'http://localhost:8080/order/myUpdate', //仅为示例，并非真实的接口地址
      data: {
        orderId: app.appData.orderId,
        sumNumber: that.data.transmit.sum_number,
        date: that.data.transmit.date + '-' + that.data.transmit.time
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        console.log(res.data.data[0])

        if (res.data.code == 1) {


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
  }
})