App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if (!wx.cloud) {
      wx.showToast({
        title: '请更新微信版本',
      })
    } else {

      wx.cloud.init({
        traceUser: true,
      });

      this.login();
    }

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },

  globalData: {

  },

  login: function () {
    const db = wx.cloud.database();
    var that = this;
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("没有过期");
        // 调用云函数
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid);
            that.globalData.openid = res.result.openid;
            //用户之前肯定登录过则云数据库有该用户信息,直接更新登录时间即可
            db.collection('user').where({
              _openid: that.globalData.openid // 填入当前用户 openid
            }).get({
              success: function (res) {
                var id = res.data[0]._id;
                db.collection('user').doc(id).update({
                  data: {
                    loginTime: db.serverDate()
                  },
                  success: console.log,
                  fail: console.error
                })
              }
            })
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
        wx.switchTab({
          url: '/pages/business/index/index',
        })
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        console.log("已经过期");
        wx.redirectTo({
          url: '/pages/business/authorize/authorize',
        })
      }
    })
  }
})
