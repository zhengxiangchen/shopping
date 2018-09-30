// pages/business/userOrders/userOrders.js
const db = wx.cloud.database();
const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = options.openid;
    db.collection('order').orderBy('createTime', 'desc').where({
      _openid: openid
    }).get({
      success: function (res) {
        var list = res.data;
        var orders = [];
        for(var i = 0; i < list.length; i++){
          var order = list[i];
          order.createTime = util.formatTime(order.createTime);
          orders.push(order);
        }
        that.setData({
          orders: orders
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

  }
})