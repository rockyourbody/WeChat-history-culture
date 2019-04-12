// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '大鸡哥',
    userInfo: {},
    isShow: true
  },
  // 跳转到list页面
  userBtn() {
    wx.navigateTo({
      url:'/pages/list/list'
    })
  },
  /**
   * 重点一：封装函数
   */
  getUserInfo() {
    // 判断用户是否授权
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            isShow: false
          })
        }
      }
    })
    // 查看是否授权
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail() {
        console.log('获取失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  // 处理回调用户信息
  handleGetUserInfo(data) {
    // 判断用户点击是否为允许
    if(data.detail.rawData) {
      // 用户点击允许
      this.getUserInfo();
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