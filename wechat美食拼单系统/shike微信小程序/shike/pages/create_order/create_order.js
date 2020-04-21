var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    address: null,
    telephone: null,
    cai_name:null,
    cai_price:null,
    sum_number:null,
    date:'2018-09-01',
    time:'00:00',
    message:null,

    before_cai_name: "请输入餐品名称",
    before_cai_price: "请输入拼单价格",
    before_number: "请输入拼单总人数"
  },


  cai_nameInput:function(e){
    this.setData({
      cai_name: e.detail.value
    })
  },
  cai_priceInput: function (e) {
    this.setData({
      cai_price: e.detail.value
    })
  },
  sum_numberInput: function (e) {
    this.setData({
      sum_number: e.detail.value
    })
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

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    that.setData({
      title: app.appData.rest.title,
      address: app.appData.rest.address,
      telephone: app.appData.rest.telephone,

      cai_name:app.appData.caiName,
      cai_price:app.appData.price,
      sum_number:app.appData.properNumber
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
    that.setData({
      title: app.appData.rest.title,
      address: app.appData.rest.address,
      telephone: app.appData.rest.telephone,
      cai_name: app.appData.caiName,
      cai_price: app.appData.price,
      sum_number: app.appData.properNumber,

      before_cai_name: app.appData.caiName,
      before_cai_price: app.appData.price,
      before_number: app.appData.properNumber
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



  submit: function () {

    var that = this
    //订单的注入
    wx.request({
      url: 'http://localhost:8080/order/input', //仅为示例，并非真实的接口地址
      data: {
        sumNumber: that.data.sum_number,
        nowNumber: 1,
        date: that.data.date + '-' + that.data.time,
        caiId: app.appData.caiId,
        orderRoot: 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {

        if (res.data.code != 0) {
          app.appData.orderId = res.data.code
          console.log(res)

          //用户_订单  的注入
          wx.request({
            url: 'http://localhost:8080/user_order/input', //仅为示例，并非真实的接口地址


            data: {
              userId: app.appData.userId,
              orderId: app.appData.orderId
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },

            success: function (res) {

              if (res.data.code != 0) {
                console.log(res)

                //餐馆_订单 的注入
                wx.request({
                  url: 'http://localhost:8080/rest_order/input', //仅为示例，并非真实的接口地址


                  data: {
                    restId: app.appData.restId,
                    orderId: app.appData.orderId
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },

                  success: function (res) {

                    console.log(res)
                    if (res.data.code != 0) {
                      wx.showToast({
                        title: '成功发布拼单'
                      })
                      wx.switchTab({
                        url: '../search/search'
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

  search_cai: function (){
    wx.navigateTo({
      url: '../choose_food/choose_food',
    })
  }
})

