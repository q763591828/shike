var app = getApp(); //跨页面传值
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "/img/choose.jpg",
    tempFilePaths:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this)
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

  formSubmit: function (e) {

    var that = this
    console.log(e)   //e.detail.value.caiName

    wx.request({
      url: 'http://localhost:8080/cai/release', //仅为示例，并非真实的接口地址
      data: {
        caiName: e.detail.value.caiName,
        price: e.detail.value.price,
        properNumber: e.detail.value.properNumber
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        console.log(res)
        if (res.data.code != 0) {
          
          

          wx.uploadFile({
            url: 'http://localhost:8080/file/foodImgUpload', //仅为示例，非真实的接口地址
            filePath: that.data.tempFilePaths[0],
            name: 'file',
            method: "post",

            formData: {
              'caiId': res.data.code
            },
            success: function (res) {

              //do something
            }
          })

          console.log(res.data.code)
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


  choose: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {

      console.log(res)
        that.setData({
          tempFilePaths: res.tempFilePaths,
          imageUrl: res.tempFilePaths[0]
        })

        console.log(that.data.tempFilePaths) //注意一定要写 that.data  不然无法取到tempFilePaths
       
      }
    })

  },
  rest_food: function(){
    wx.navigateTo({
      url: '../rest_food/rest_food',
    })
  }
})