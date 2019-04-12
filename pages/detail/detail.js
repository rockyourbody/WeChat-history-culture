// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{},
    index: null,
    isCollected: false,
    isMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      detailData: datas.list_data[index],
      index
    });
    // 根据本地缓存的数据判断用户是否收藏当前的文章
    let detailStorage = wx.getStorageSync('isCollected');
    // 初始化一个空对象
    if (!detailStorage) {
      wx.setStorageSync('isCollected', {})
    }
    // 判断用户是否收藏
    if (detailStorage[index]) {
      this.setData({
        isCollected: true
      })
    };
    // 判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({
        isMusic:true
      });
    }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isMusic:true
      });
      // 修改isMusic中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    });
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isMusic: false
      });
      appDatas.data.isPlay = false;
    });
  },

  // 收藏功能
  collected() {
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });
    let title = isCollected?'收藏成功': '取消收藏';
    wx.showToast({
      title,
      icon:'success'
    });
    // 数据缓存
    let index = this.data.index;
    wx.getStorage({
      key: 'isCollected',
      success: function(res) {
        let obj = res.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('成功')
          },
        })
      },
    })    
  },
  handleMusic() {
    // 处理音乐播放
    let isMusic = !this.data.isMusic;
    this.setData({
      isMusic
    });
    // 控制音乐播放
    if (isMusic) {
      let { dataUrl, title } = this.data.detailData.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      wx.pauseBackgroundAudio()
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