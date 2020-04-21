
//初始化数据
function tabbarinit() {
 return [
      { "current":0,
        "pagePath": "/pages/my_rest_order/my_rest_order",
        "iconPath": "/img/home.png",
        "selectedIconPath": "/img/home_on.png",
        "text": "主页"
      },
      {
        "current": 0,
        "pagePath": "/pages/rest_censor/rest_censor",
        "iconPath": "/img/message.png",
        "selectedIconPath": "/img/message_on.png",
        "text": "待审查"

      },
      {
        "current": 0,
        "pagePath": "/pages/release_food/release_food",
        "iconPath": "/img/category.png",
        "selectedIconPath": "/img/category_on.png",
        "text": "餐品发布"
      },
      {
        "current": 0,
        "pagePath": "/pages/rest_info/rest_info",
        "iconPath": "/img/buy.png",
        "selectedIconPath": "/img/buy_on.png",
        "text": "餐馆信息"
      }
    ]

}

/**
 * tabbar主入口
 * @param  {String} bindName 
 * @param  {[type]} id       [表示第几个tabbar，以0开始]
 * @param  {[type]} target   [当前对象]
 */
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}


module.exports = {
  tabbar: tabbarmain
}