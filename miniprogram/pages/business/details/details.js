const db = wx.cloud.database();
const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgStaticPath: "cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d",
    imgFullPath: "",
    goods: {},
    goodsPrice:[],//价格
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    interval: 3000,
    duration: 800,

    haveSpec:false,//是否选择规格
    specName:'',//已选择的规格
    visible: false,
    actions: [],//显示规格内容
    swiperImgs:[]//存放商品轮播图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodsId = options.goodsId;
    var imgs = [];
    var swiperImgs = [];
    //根据商品id获取商品信息
    db.collection('goods').doc(goodsId).get({
      success: function (res) {
        swiperImgs.push(that.data.imgStaticPath + res.data.goodsIndexImg);
        imgs = res.data.goodsImgs;
        for (var i = 0; i < imgs.length; i++){
          swiperImgs.push(that.data.imgStaticPath + imgs[i]);;
        }
        that.setData({
          goods:res.data,
          swiperImgs: swiperImgs
          // imgFullPath: that.data.imgStaticPath + res.data.goodsIndexImg
        })
        var actions = [];
        var length = that.data.goods.goodsSpec.length;
        for (var i = 0; i < length; i++){
          var spec = that.data.goods.goodsSpec[i];
          var item = {
            name: spec
          };
          actions.push(item);
        }
        that.setData({
          actions: actions,
          goodsPrice: that.data.goods.goodsPrice
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

  //点击加入购物车
  addToCart() {
    const that = this;
    const num = that.data.num;
    let total = that.data.totalNum;

    if(!that.data.haveSpec){
      $Message({
        content: '请先选择规格',
        type: 'warning'
      });
      that.setData({
        visible: true
      });
      return;
    }
    
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
        var existSpec = false;
        //判断购物车缓存中是否已存在该货品
        for (var i = 0; i < cartItems.length; i++){
          var goods = cartItems[i];
          if (goods.goodsId == that.data.goods._id){
            exist = true;
            if (goods.spec == that.data.specName){
              goods.num = goods.num + num;
              existSpec = true;
              break;
            }
          }
        }
        if (!exist){
          var newGoods = {
            goodsId: that.data.goods._id,
            goodsName: that.data.goods.goodsName,
            goodsPrice: that.data.goodsPrice,
            num: num,
            spec: that.data.specName,
            goodsIndexImg: that.data.imgFullPath,
            selected: true
          }
          cartItems.push(newGoods);
          existSpec = true;
        }

        if (!existSpec) {
          var newGoods = {
            goodsId: that.data.goods._id,
            goodsName: that.data.goods.goodsName,
            goodsPrice: that.data.goodsPrice,
            num: num,
            spec: that.data.specName,
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

  showImg:function(e){
    var that = this;
    var current = that.data.swiperImgs[e.currentTarget.dataset.i];
    wx.previewImage({
      urls: that.data.swiperImgs,
      current: current
    })
  },

  //选择取消后隐藏规格选择框
  handleCancel() {
    this.setData({
      visible: false
    });
  },

  //弹出规格选择底部框
  showSpec:function(){
    this.setData({
      visible: true
    });
  },

  //选择商品规格
  selectSpec: function ({ detail }){
    const index = detail.index;
    var spec = this.data.actions[index].name;
    var goodsPrice = this.data.goods.goodsPrice[index];
    $Message({
      content: '选择的规格：' + spec,
      type: 'success'
    });
    this.setData({
      visible: false,
      haveSpec:true,
      specName: spec,
      goodsPrice: goodsPrice
    });
  },

  toCart:function(){
    wx.switchTab({
      url: '/pages/business/cart/cart',
    })
  }
})