
var app = getApp();

Page({
  data: {
    
    username: null,
    password: null,
   
  },
  onLoad: function (options) {


  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  loginBtnClick: function () {

    // 用户名和密码验证的过程

    app.appData.userinfo = { username: this.data.username, password: this.data.password }
    wx.request({
      url: 'http://localhost:8080/user/login', //仅为示例，并非真实的接口地址
      data: {
        userName: this.data.username,
        password: this.data.password,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        //console.log(res)
        if(res.data.code == 1){
          app.appData.userId = res.data.data.userId
          //console.log("用户的id:" + app.appData.userId)
          wx.switchTab({
            url: '../search/search'
          })
        }else if(res.data.code == 0){
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

  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },

  passwordInput: function (event) {
    this.setData({ password: event.detail.value })
  },

  registerBtnClick: function(event){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  rest_login: function () {
    wx.redirectTo({
      url: '../rest_login/rest_login',
    })
  }

})