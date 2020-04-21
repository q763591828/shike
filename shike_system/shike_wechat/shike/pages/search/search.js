var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];

var app = getApp(); //跨页面传值
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {},
        rest:{
          title:null,
          address:null,
          telephone:null
        }

    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
        
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
          ak: 'pbkBN9E5LPweERpmTjhDAly6dnUnn53h'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        BMap.search({
            "query": '美食',
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
        //console.log('开始加载')
    },
    showSearchInfo: function(data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        }); 
        that.setData({
          rest: {
            title: data[i].title,
            address: data[i].address,
            telephone: data[i].telephone
          }
        })
        app.appData.rest.title = data[i].title,
        app.appData.rest.address = data[i].address,
        app.appData.rest.telephone = data[i].telephone,
        //console.log(app.appData.rest)


        //餐馆的注入
        wx.request({
          url: 'http://localhost:8080/rest/input', //仅为示例，并非真实的接口地址
          data: {
            title: app.appData.rest.title,
            address: app.appData.rest.address,
            telephone: app.appData.rest.telephone
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

            //console.log(res)
            if (res.data.code != 0) {
              app.appData.restId = res.data.code
              //console.log("餐馆的id:" + app.appData.restId)
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
    changeMarkerColor: function(data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                data[i].iconPath = "../../img/marker_yellow.png";
            } else {
                data[i].iconPath = "../../img/marker_red.png";
            }
            markersTemp[i] = data[i];
        }
        that.setData({
            markers: markersTemp
        });
    },
    
})