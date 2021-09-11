// 左侧导航栏
const navMsg = [{
  name: '首页',
  path: '/'
}, {
  name: '上映新片',
  path: '/song-list'
}, {
  name: '购买NFT',
  path: '/singer'
}, {
  name: '电影票',
  path: '/my-music'
}]

const dropMsg = [{
  name: '上传影片信息',
  path: '/uploadInfo'
},
{
  name: '发布版权',
  path: '/publishMovie'
},
{
  name: '发布艺术品',
  path: '/publishArt'
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
  menuList,
  dropMsg
}
