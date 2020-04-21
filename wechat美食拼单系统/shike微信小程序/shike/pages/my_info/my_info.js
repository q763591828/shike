var app = getApp(); //跨页面传值

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    userInfo:null,
    modalHidden2: true,
    modalHidden: true,
    transmit:null,
    imageUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/user/showUser', //仅为示例，并非真实的接口地址
      data: {
        userId: app.appData.userId
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
            userInfo:res.data.data
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
      url: 'http://localhost:8080/user/showImgId', //仅为示例，并非真实的接口地址
      data: {
        userId: app.appData.userId
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
           imageUrl:res.data.data.imgId
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
    


    var userName ="transmit.userName"
    var password = "transmit.password"
    var age = "transmit.age"
    var sex = "transmit.sex"
    var telephone = "transmit.telephone"
    var mailbox = "transmit.mailbox"

    //console.log(e.detail.value.userName)
    var that = this;

    if(e.detail.value.userName!=""){
      
      that.setData({
        [userName]: e.detail.value.userName
      })
    } else {
      that.setData({
        [userName]: that.data.userInfo.userName
      })
    }
    
    if (e.detail.value.password != "") {
      that.setData({
        [password] : e.detail.value.password
      })
      
    } else {
      that.setData({
        [password]: that.data.userInfo.password
      })
    }
    if (e.detail.value.age != "") {
      that.setData({
        [age] : e.detail.value.age
      })
      
    } else {
      that.setData({
        [age]: that.data.userInfo.age
      })
    }
    if (e.detail.value.sex != "") {
      that.setData({
        [sex] :e.detail.value.sex
      })
      
    } else {
      that.setData({
        [sex]: that.data.userInfo.sex
      })
    }
    if (e.detail.value.telephone != "") {
      that.setData({
        [telephone] : e.detail.value.telephone
      })
      
    } else {
      that.setData({
        [telephone]: that.data.userInfo.telephone
      })
    }
    if (e.detail.value.mailbox != "") {
      that.setData({
        [mailbox] : e.detail.value.mailbox
      })
      
    } else {
      that.setData({
        [mailbox]: that.data.userInfo.mailbox
      })
    }

    console.log(that.data.transmit)
    wx.request({
      url: 'http://localhost:8080/user/update', //仅为示例，并非真实的接口地址
      data: {
        userId: that.data.transmit.userId,
        root: 0,
        userName: that.data.transmit.userName,
        password: that.data.transmit.password,
        age: that.data.transmit.age,
        sex: that.data.transmit.sex,
        telephone: that.data.transmit.telephone,
        mailbox: that.data.transmit.mailbox
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code != 0) {
          wx.request({
            url: 'http://localhost:8080/user/showUser', //仅为示例，并非真实的接口地址
            data: {
              userId: app.appData.userId
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
                  userInfo:res.data.data
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
  logout: function(){
    app.appData.userId = null
    wx.redirectTo({
      url: '../login/login',
    })
  },
  upload:function(){
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imageUrl: tempFilePaths[0]
        })
        wx.uploadFile({
          url: 'http://localhost:8080/file/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          method: "post",

          formData: {
            'userId': app.appData.userId
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