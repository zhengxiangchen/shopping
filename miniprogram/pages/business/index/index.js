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
    duration: 800,

    inputShowed: false,
    inputVal: "",
    searchType:[],
    searchGoods:[]
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


    db.collection('goods').orderBy('_id', 'asc').orderBy('goodsName', 'desc').limit(6).get({
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
    
  },

  //打开购物说明页
  explain:function(){
    wx.navigateTo({
      url: '/pages/business/superindex/superindex',
    })
  },

  //点击搜索框触发
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //点击取消触发
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      searchType: [],
      searchGoods: []
    });
  },
  //点击小叉触发
  clearInput: function () {
    this.setData({
      inputVal: "",
      searchType: [],
      searchGoods: []
    });
  },
  //输入信息触发
  inputTyping: function (e) {
    var that = this;
    var text = e.detail.value;

    db.collection('goodsSecondType').where({
      name: text
    }).get({
      success: function (res) {
        var list = res.data;
        if (list.length > 0){
          that.setData({
            searchType: list
          })
        }else{
          db.collection('goods').where({
            goodsName: text
          }).get({
            success: function (res2) {
              var list = res2.data;
              that.setData({
                searchGoods: list
              })
            }
          })
        }
      }
    })

    that.setData({
      inputVal: text
    });
  }

})