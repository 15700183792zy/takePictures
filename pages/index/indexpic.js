// pages/index/indexpic.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasImgUrl:"",
    canvasImgUrl2:"",
    Url:"https://mdapi.zjwist.com/mediainfo3/get/67587"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("path", "");
  },

  pic2tap:function(){
    var path = wx.getStorageSync("path");
    console.log(path);
    this.setData({
      canvasImgUrl2: path
    });
   
  },
  // 图片压缩
  pictap: function () {
    var that = this;
    /**图片压缩
     * 1网络图片需要调用downloadFile 获取在本地的路径--》drawCanvas
     * 
     * 2本地图片 直接调用 drawCanvas
     */
    var url ='https://mdapi.zjwist.com/mediainfo3/get/67587';
    wx.downloadFile({
      url: url,
      success: function (sres) {
        console.log(sres);
        url = sres.tempFilePath;
        that.drawCanvas(url);
      }, fail: function (fres) {

      }
    })
  },

dowfile:function(url){
  console.log('dowfile=======??'+url);
  var that = this;
  wx.saveFile({
    tempFilePath: url,
    success: function (res) {
      console.log(res);
      console.log(res.savedFilePath)
      that.setData({
        canvasImgUrl: res.savedFilePath
      });
    },
    fail: function (res) {
      console.log(res);
    }
  })

},

  // 缩放图片
  drawCanvas: function (url) {
    var that = this;
    var ctx = wx.createCanvasContext('attendCanvasId');
    ctx.drawImage(url, 0, 0, 100, 100);
    ctx.draw(true, function () {
      that.prodImageOpt(url)
   
    });//在回调进行保存不会出现空白
  },
  // 生成图片
  prodImageOpt: function (url) {
    console.log(url);
    var that = this;


    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        var path = res.tempFilePath;
      
        console.log(path);
       that.setData({
          canvasImgUrl: path
        });
       wx.setStorageSync("path", path);
      }
    });
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