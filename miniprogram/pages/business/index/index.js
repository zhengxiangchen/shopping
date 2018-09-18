const db = wx.cloud.database();
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgStaticPath : "cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d",
    imgUrls: [],
    goods:[],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //从云数据库中获取轮播图片
    db.collection('swiperImg').get({
      success: function (res) {
        var list = res.data;
        var pathList = [];
        for(var i = 0; i < list.length; i++){
          pathList.push(that.data.imgStaticPath + list[i].imgPath);
        }
        that.setData({
          imgUrls: pathList
        })
      }
    })


    db.collection('goods').get({
      success: function (res) {
        var list = res.data;
        that.setData({
          goods: list
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