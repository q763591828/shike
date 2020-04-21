App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },

  appData: {
    userinfo: null,
    userId:null,
    caiId:null,
    caiName:null,
    price:null,
    properNumber:null,
    orderId:null,
    restId:null,
    rest: {
      title: null,
      address: null,
      telephone: null
    },
    restInfo:null
  }


})