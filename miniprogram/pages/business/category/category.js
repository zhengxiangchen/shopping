const db = wx.cloud.database();
Page({
    data: {
      imgStaticPath: "cloud://yun-tes-f1b43d.7975-yun-tes-f1b43d",
        category: [
            {name:'果味',id:'guowei'},
            {name:'蔬菜',id:'shucai'},
            {name:'炒货',id:'chaohuo'},
            {name:'点心',id:'dianxin'},
            {name:'粗茶',id:'cucha'},
            {name:'淡饭',id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onReady(){
      // var that = this;
      // db.collection('goods').get({
      //   success: function (res) {
      //     var list = res.data;
      //     that.setData({
      //       detail: list
      //     })
      //   }
      // })
        
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index
        })
    }
    
})