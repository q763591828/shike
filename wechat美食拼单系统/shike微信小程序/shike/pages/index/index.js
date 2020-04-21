
var app = getApp();

Page({
  data: {
    root:0,
    username: null,
    password: null,
    age: null,
    sex:null,
    telephone:null,
    mailbox:null
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
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var check = /^([a-z0-9A-Z]+[-|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]{2,}$/;
    
    if (this.data.username.length == 0) {
      wx.showToast({
        title: '输入用户名为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } 
    if (this.data.password.length == 0) {
      wx.showToast({
        title: '输入密码为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } 
    if (this.data.age.length == 0) {
      wx.showToast({
        title: '输入年龄为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } 
    if (this.data.sex.length == 0) {
      wx.showToast({
        title: '输入性别为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } 
    if (this.data.telephone.length == 0) {
      wx.showToast({
        title: '输入手机号为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (this.data.telephone.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.telephone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } 

    if(this.data.mailbox == 0){
      wx.showToast({
        title: '输入邮箱为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (!check.test(this.data.mailbox)) {
      wx.showToast({
        title: '邮箱号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }

    wx.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1500
    })
    // 用户名和密码验证的过程

    app.appData.userinfo = { username: this.data.username, password: this.data.password }
    wx.request({
      url: 'http://localhost:8080/user/regist', //仅为示例，并非真实的接口地址
      data: {
        root:this.data.root,
        userName: this.data.username,
        password: this.data.password,
        age: this.data.age,
        sex:this.data.sex,
        telephone:this.data.telephone,
        mailbox:this.data.mailbox
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 1) {
          
          wx.navigateTo({
            url: '../login/login'
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

  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },

  passwordInput: function (event) {
    this.setData({ password: event.detail.value })
  },

  ageInput: function(event){
    console.log(event.detail.value)
    this.setData({ age:event.detail.value})
  },

  sexInput:function(event){
    console.log(event.detail.value)
    this.setData({ sex:event.detail.value })
  },

  telephoneInput:function(event){
    this.setData({ telephone:event.detail.value})
  },

  mailboxInput:function(event){
    this.setData({mailbox:event.detail.value})
  },
  login:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  }
})