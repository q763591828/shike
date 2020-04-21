var app = getApp(); //跨页面传值
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodsInfo:null,
    imgUrls: [
      'http://localhost:8080/photo/wxac8fd17328d047de.o6zAJswQ0Op0CFN4_nplqLGAycPY.350d610a2e7a6d8254f9a1cf0cc65319.jpg',
      'http://localhost:8080/photo/wxac8fd17328d047de.o6zAJswQ0Op0CFN4_nplqLGAycPY.fdfe1f968ba0cd60159e3e78e50a3bdb.jpg',
      'http://localhost:8080/photo/wxac8fd17328d047de.o6zAJswQ0Op0CFN4_nplqLGAycPY.f0624ffdaf1b18649d623ed3608ce3e9.jpg'
    ],

  },

  choose: function(e){
    console.log(e)
    app.appData.caiId = e.target.dataset.cai_id
    app.appData.caiName=e.target.dataset.cainame
    app.appData.price = e.target.dataset.price
    app.appData.properNumber = e.target.dataset.propernumber
    wx.redirectTo({
      url: '../create_order/create_order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'http://localhost:8080/cai/findAll', //仅为示例，并非真实的接口地址
      data: {
        info_number: 100,
        rest_id:app.appData.restId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        //console.log(res)
        if (res.data.code == 1) {
          console.log(res)
          that.setData({
            foodsInfo: res.data.data
          })
          console.log(that.data.foodsInfo)
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
    
  }
})