const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgStaticPath: "cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d",
    imgFullPath: "",
    goods: {},
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodsId = options.goodsId;
    //根据商品id获取商品信息
    db.collection('goods').doc(goodsId).get({
      success: function (res) {
        that.setData({
          goods:res.data,
          imgFullPath: that.data.imgStaticPath + res.data.goodsIndexImg
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
    var cartItems = wx.getStorageSync("cartItems");
    if (cartItems.length > 0) {
      var totalNum = 0;
      for (var i = 0; i < cartItems.length; i++) {
        var goods = cartItems[i];
        totalNum += goods.num;
      }
      this.setData({
        hasCarts:true,
        totalNum: totalNum
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

  addToCart() {
    const that = this;
    const num = that.data.num;
    let total = that.data.totalNum;
    
    that.setData({
      show: true
    })
    setTimeout(function () {
      that.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function () {
        that.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num + total
        })
        //获取缓存中的已添加购物车信息
        var cartItems = wx.getStorageSync('cartItems') || [];
        var exist = false;
        //判断购物车缓存中是否已存在该货品
        for (var i = 0; i < cartItems.length; i++){
          var goods = cartItems[i];
          if (goods.goodsId == that.data.goods._id){
            goods.num = goods.num + num;
            exist = true;
            break;
          }
        }
        if (!exist){
          var newGoods = {
            goodsId: that.data.goods._id,
            goodsName: that.data.goods.goodsName,
            goodsPrice: that.data.goods.goodsPrice,
            num: num,
            goodsIndexImg: that.data.imgFullPath,
            selected: true
          }
          cartItems.push(newGoods);
        }
        wx.setStorageSync('cartItems', cartItems);


      }, 200)
    }, 300)

  },

  numberChange({ detail }) {
    this.setData({
      num: detail.value
    })
  },


  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  showImg:function(){
    var that = this;
    var imgs = [];
    imgs.push(that.data.imgFullPath);
    var imglist = that.data.goods.goodsImgs;
    for (var i = 0; i < imglist.length; i++){
      var fullPath = that.data.imgStaticPath + imglist[i];
      imgs.push(fullPath);
    }
    wx.previewImage({
      urls: imgs,
    })
  }
})