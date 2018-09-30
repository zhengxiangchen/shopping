const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    hasAddress: false,
    isDbAddress:false,
    address: {},

    isAdmin:false,//用于判断是否是店主本人

    visible: false,
    actions: [
      {
        name: '复制',
        color: '#19be6b',
        icon: 'like_fill'
      },
      {
        name: '取消'
      }
    ],
    wxNumber: "Jennifer_wsq"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openid;
    if (openid == 'oDoIC0XEE-mz9G2Koj5Wem2uzajA' || openid == 'oDoIC0cnxdzY7fEKYJszf545xiO4'){
      that.setData({
        isAdmin:true
      })
    }

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

    db.collection('order').where({
      _openid: app.globalData.openid // 填入当前用户 openid
    }).get({
      success: function (res) {
        var list = res.data;
        var orders = [];
        for(var i = 0; i < list.length; i++){
          var oneOrder = {};
          var name = "";
          var num = "";
          oneOrder.id = list[i]._id;
          oneOrder.createTime = list[i].createTime;
          for (var j = 0; j < list[i].goods.length; j++){
            if (name.length > 0){
              name = name + ",";
            }
            if (num.length > 0) {
              num = num + ",";
            }
            name = name + list[i].goods[j].goodsName + ":" + list[i].goods[j].spec;
            num = num + list[i].goods[j].num;
          }
          oneOrder.name = name;
          oneOrder.num = num;
          oneOrder.money = list[i].money;
          orders.push(oneOrder);
        }

        that.setData({
          orders: orders
        })

      }
    })
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
  },

  showWe:function(){
    this.setData({
      visible: true
    });
  },


  handleClick({ detail }) {
    var that = this;
    const index = detail.index;
    if (index === 0) {
      wx.setClipboardData({
        data: that.data.wxNumber,
      })
    }

    that.setData({
      visible: false
    });
  },
})