const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgStaticPath: "cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d",
    category: [],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'W6EY0O9Ghf6stBXU',
    banner: 'cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d/banner/ruye.jpg',
    cate: '乳液'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('goodsType').get({
      success: function (res) {
        var list = res.data;
        that.setData({
          category: list
        })
      }
    })

    db.collection('goods').where({
      goodsTypeId: that.data.toView
    }).get({
      success: function (res) {
        that.setData({
          detail: res.data
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

  switchTab(e) {
    var that = this;
    db.collection('goodsType').doc(e.target.dataset.id).get({
      success: function (res) {
        that.setData({
          banner: that.data.imgStaticPath + res.data.banner,
          cate: res.data.name,
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      }
    })

    db.collection('goods').where({
      goodsTypeId: e.target.dataset.id
    }).get({
      success: function (res) {
        that.setData({
          detail: res.data
        })
      }
    })
  }
})