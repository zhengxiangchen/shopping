const db = wx.cloud.database();
const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    goods:[],
    createTime:"",
    money:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderId = options.id;
    db.collection('order').doc(orderId).get({
      success: function (res) {
        var order = res.data;
        that.setData({
          address: order.address,
          goods: order.goods,
          createTime: util.formatTime(order.createTime)
        })

        var money = 0;
        for (var i = 0; i < that.data.goods.length; i++) {
          var oneGoods = that.data.goods[i];
          money = money + (parseInt(oneGoods.goodsPrice) * parseInt(oneGoods.num));
        }
        that.setData({
          money: money
        })
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


  
})