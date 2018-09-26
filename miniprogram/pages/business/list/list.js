const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgStaticPath: "cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d",
    goods: [],
    banner: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodsSecondTypeId = options.goodsSecondTypeId;

    db.collection('goodsSecondType').doc(goodsSecondTypeId).get({
      success: function (res) {
        that.setData({
          banner: that.data.imgStaticPath + res.data.banner
        })
      }
    })

    //根据商品分类id查所有该类商品
    db.collection('goods').where({
      goodsSecondTypeId: goodsSecondTypeId // 填入当前用户 openid
    }).get({
      success: function (res) {
        that.setData({
          goods:res.data
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