const db = wx.cloud.database()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    hasAddress: false,
    isDbAddress:false,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    var address = wx.getStorageSync("address");
    if(address == ""){
      //数据库--获取地址信息
      db.collection('address').where({
        _openid: app.globalData.openid // 填入当前用户 openid
      }).get({
        success: function (res) {
          var addressList = res.data;
          if (addressList.length > 0) {
            that.setData({
              address: addressList[0],
              hasAddress: true,
              isDbAddress:true
            })
          }
        }
      })
    }else{
      that.setData({
        address: address,
        hasAddress: true
      })
    }
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

  //地址管理
  addressManager:function(){
    var that = this;
    wx.authorize({
      scope: 'scope.address',
      success:function(){
        wx.chooseAddress({
          success: (res) => {
            wx.setStorageSync("address", res);
            that.setData({
              address:res,
              isDbAddress:false
            })
          }
        })
      },
      fail:function(){
        wx.navigateTo({
          url: '/pages/business/address/address',
        })
      }
    })
  }
})