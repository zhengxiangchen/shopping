// pages/superindex/superindex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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


  //弹出提示框--用户点击进行授权
  openAlert: function () {
    
  },

  //获取用户信息
  getuserinfo: function (e) {
    var msg = e.detail.errMsg;
    if(msg.indexOf("ok") != -1 ){
      console.log("用户点击了同意,程序执行登录操作");
      wx.showLoading({
        title: '正在登陆',
      });
      //更新登录态
      wx.login({
      });

      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid);
          app.globalData.openid = res.result.openid;
          wx.switchTab({
            url: '/pages/business/index/index',
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
      

    }else{
      console.log("用户点击了拒绝");
    }
  },
})