// 左侧导航栏
const navMsg = [{
  name: '首页',
  path: '/'
}, {
  name: '我的',
  path: '/myInfo'
}]

export const dropUploadMsg = [{
  name: '上传影片信息',
  path: '/uploadInfo'
},
{
  name: '发布版权',
  path: '/publishCopyright'
},
{
  name: '发布艺术品',
  path: 'publishArtWork'
}
]

export const dropBuyMsg = [{
  name: '购买版权',
  path: '/buyCopyright'
},
{
  name: '购买艺术品',
  path: '/buyArtWork'
}
]

// 右侧导航栏
const loginMsg = [{
  name: '登录',
  path: '/login-in'
}, {
  name: '注册',
  path: '/sign-up'
}]

// 用户下拉菜单项
const menuList = [{
  name: '设置',
  path: '/setting'
}, {
  name: '退出',
  path: 0
}]

export {
  navMsg,
  loginMsg,
  menuList
}
