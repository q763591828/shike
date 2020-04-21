var app = getApp(); //跨页面传值
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    restInfo: null,
    modalHidden2: true,
    modalHidden: true,
    transmit: null,
    imageUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    template.tabbar("tabBar", 3, this)

    var that = this
    wx.request({
      url: 'http://localhost:8080/rest/findRestInfo', //仅为示例，并非真实的接口地址
      data: {
        restId: app.appData.restId
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
            restInfo: res.data.data
          })
          
          that.setData({
            transmit: res.data.data
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
      url: 'http://localhost:8080/rest/showImgId', //仅为示例，并非真实的接口地址
      data: {
        restId: app.appData.restId
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
            imageUrl: res.data.data.imgId
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


  formSubmit: function (e) {

    var password = "transmit.password"
    var title = "transmit.title"
    var address = "transmit.address"
    var telephone = "transmit.telephone"

    //console.log(e.detail.value.userName)
    var that = this;


    if (e.detail.value.password != "") {
      that.setData({
        [password]: e.detail.value.password
      })
    }else{
      that.setData({
        [password]: that.data.restInfo.password
      })
    }
    if (e.detail.value.title != "") {
      that.setData({
        [title]: e.detail.value.title
      })

    } else {
      that.setData({
        [title]: that.data.restInfo.title
      })
    }
    if (e.detail.value.address != "") {
      that.setData({
        [address]: e.detail.value.address
      })

    } else {
      that.setData({
        [address]: that.data.restInfo.address
      })
    }
    if (e.detail.value.telephone != "") {
      that.setData({
        [telephone]: e.detail.value.telephone
      })

    } else {
      that.setData({
        [telephone]: that.data.restInfo.telephone
      })
    }
  

    console.log(that.data.transmit)
    wx.request({
      url: 'http://localhost:8080/rest/update', //仅为示例，并非真实的接口地址
      data: {
        restId: that.data.transmit.restId,
        password: that.data.transmit.password,
        title: that.data.transmit.title,
        address: that.data.transmit.address,
        telephone: that.data.transmit.telephone,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code != 0) {
          wx.request({
            url: 'http://localhost:8080/rest/findRestInfo', //仅为示例，并非真实的接口地址
            data: {
              restId: app.appData.restId
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
                  restInfo: res.data.data
                })
                that.setData({
                  transmit: res.data.data
                })
                wx.showToast({
                  title: '成功'
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
  logout: function () {
    app.appData.restId = null
    wx.redirectTo({
      url: '../rest_login/rest_login',
    })
  },
  upload: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imageUrl: tempFilePaths[0]
        })
        wx.uploadFile({
          url: 'http://localhost:8080/file/restImgUpload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          method: "post",

          formData: {
            'restId': app.appData.restId
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })

  }

})