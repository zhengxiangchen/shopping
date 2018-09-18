const db = wx.cloud.database()
const { $Message } = require('../../../dist/base/index');
const { $Toast } = require('../../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //数据库--获取地址信息
    db.collection('address').where({
      _openid: app.globalData.openid // 填入当前用户 openid
    }).get({
      success: function (res) {
        var addressList = res.data;
        if (addressList.length > 0) {
          that.setData({
            address: addressList[0],
          })
        }
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

  bindName: function(e) {
    this.setData({
      'address.name': e.detail.detail.value
    })
  },
  bindPhone: function(e) {
    this.setData({
      'address.phone': e.detail.detail.value
    })
  },
  bindDetail: function(e) {
    this.setData({
      'address.detail': e.detail.detail.value
    })
  },

  //保存或更新地址信息
  saveAddress:function(){
    var that = this;
    var name = that.data.address.name;
    var phone = that.data.address.phone;
    var detail = that.data.address.detail;
    if (name == undefined || phone == undefined || detail == undefined){
      $Message({
        content: '亲,请填写完整地址信息!',
        type: 'warning'
      });
    }else{
      $Toast({
        content: '保存中',
        type: 'loading'
      });

      //数据库--添加地址信息
      var openid = app.globalData.openid;
      db.collection('address').where({
        _openid: openid // 填入当前用户 openid
      }).get({
        success: function (res) {
          var list = res.data;
          //没有地址记录--新增
          if(list.length <= 0){
            db.collection('address').add({
              data: {
                name: name,
                phone: phone,
                detail: detail
              },
              success: function (res) {
                $Toast.hide();
                $Toast({
                  content: '保存成功',
                  type: 'success'
                });
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/business/user/user',
                  })
                }, 3000);
              },
              fail: console.error
            })
          }else{//已经存在地址--更新
            var id = list[0]._id;
            db.collection('address').doc(id).set({
              // data 传入需要局部更新的数据
              data: {
                name: name,
                phone: phone,
                detail: detail
              },
              success: function (res) {
                $Toast.hide();
                $Toast({
                  content: '更新成功',
                  type: 'success'
                });
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/business/user/user',
                  })
                }, 3000);
              },
              fail: console.error
            })

          }
        }
      })


    //   db.collection('address').add({
    //     data: {
    //       name: name,
    //       phone: phone,
    //       detail: detail
    //     },
    //     success: function (res) {
    //       $Toast.hide();
    //       $Toast({
    //         content: '保存成功',
    //         type: 'success'
    //       });
    //       setTimeout(() => {
    //         wx.switchTab({
    //           url: '/pages/business/user/user',
    //         })
    //       }, 3000);
    //     },
    //     fail: console.error
    //   })
     }
  }
})