import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login => import('@/views/login'),
    meta: { title: '用户登录' }
  },
  {
    path: '/register',
    component: rigster => import('@/views/login/rigster'),
    meta: { title: '注册' }
  },
  {
    path: '/findpw',
    component: findpw => import('@/views/login/findpw'),
    meta: { title: '找回密码' }
  },
  {
    path: '/reset',
    component: reset => import('@/views/login/reset'),
    meta: { title: '重置密码' }
  },
  {
    path: '/regck',
    component: regck => import('@/views/login/regck'),
    meta: { title: '注册验证' }
  },
  {
    path: '/notfound',
    component: notfound => import('@/views/login/notfound'),
    meta: { title: 'Not Found' }
  },
  {
    path: '/',
    component: Layout => import('@/views/layout'),
    children: [
      {
        path: '/',
        redirect: '/panel'
      },
      {
        path: '/panel',
        component: Panel => import('@/views/panel'),
        meta: { title: '首页' }
      },
      {
        path: '/domin/list',
        component: List => import('@/views/domin'),
        children: [
          {
            path: '',
            component: Li => import('@/views/domin/components/list'),
            meta: { title: '域名解析' }
          },
          {
            path: 'record',
            component: Record => import('@/views/domin/components/record'),
            meta: { title: '解析记录' }
          },
          {
            path: 'count',
            component: Count => import('@/views/domin/components/count'),
            meta: { title: '资源列表' }
          }
        ]
      },
      {
        path: '/domin/ptr',
        component: ptr => import('@/views/domin/ptr'),
        meta: { title: '反向解析' }
      },
      {
        path: '/domin/operate',
        component: Operate => import('@/views/domin/operate'),
        meta: { title: '批量操作' }
      },
      {
        path: '/domin/cfw',
        component: cfw => import('@/views/domin/cfw'),
        meta: { title: '条件转发' }
      },
      {
        path: '/domin/ns',
        component: ns => import('@/views/domin/ns'),
        meta: { title: 'NS分组' }
      },
      {
        path: '/device',
        component: Device => import('@/views/device'),
        meta: { title: '节点管理' }
      },
      {
        path: '/node/top',
        component: Top => import('@/views/device/top'),
        meta: { title: '节点资源实时统计' }
      },
      {
        path: '/node/chart',
        component: nchart => import('@/views/device/chart'),
        meta: { title: '节点资源统计' }
      },
      {
        path: '/line/ips',
        component: ips => import('@/views/line/ips'),
        meta: { title: 'IP名单' }
      },
      {
        path: '/query/flow',
        component: flow => import('@/views/query/flow'),
        meta: { title: '查询流量' }
      },
      {
        path: '/query/top',
        component: qtop => import('@/views/query/top'),
        meta: { title: '排行统计' }
      },
      {
        path: '/query/newlog',
        component: newlog => import('@/views/query/newlog'),
        meta: { title: '最新查询' }
      },
      {
        path: '/product/list',
        component: plist => import('@/views/product/list'),
        meta: { title: '套餐列表' }
      },
      {
        path: '/product/buy',
        component: pbuy => import('@/views/product/buy'),
        meta: { title: '套餐列表' }
      },
      {
        path: '/product/log',
        component: log => import('@/views/product/log'),
        meta: { title: '开通记录' }
      },
      {
        path: '/log/board',
        component: lb => import('@/views/log')
      },
      {
        path: '/log/opt',
        component: opt => import('@/views/log/domin'),
        meta: { title: '操作日志' }
      },
      {
        path: '/log/login',
        component: log => import('@/views/log/login'),
        meta: { title: '登录日志' }
      },
      {
        path: '/log/clean',
        component: clean => import('@/views/log/clean'),
        meta: { title: '清除设置' }
      },
      {
        path: '/manage/user',
        component: user => import('@/views/manage'),
        meta: { title: '用户管理' }
      },
      {
        path: '/user/pay',
        component: paylog => import('@/views/manage/pay'),
        meta: { title: '在线充值' }
      },
      {
        path: '/user/paylog',
        component: paylog => import('@/views/manage/paylog'),
        meta: { title: '充扣记录' }
      },
      {
        path: '/manage/password',
        component: password => import('@/views/manage/password'),
        meta: { title: '修改密码' }
      },
      {
        path: '/manage/verify',
        component: verify => import('@/views/manage/verify'),
        meta: { title: '实名认证' }
      },
      {
        path: '/user/info',
        component: verify => import('@/views/manage/info'),
        meta: { title: '用户信息' }
      },
      {
        path: '/set/board',
        component: board => import('@/views/set'),
        meta: { title: '后台设置' }
      },
      {
        path: '/set/domin',
        component: dom => import('@/views/set/domin'),
        meta: { title: 'DNS设置' }
      },
      {
        path: '/set/setup',
        component: setup => import('@/views/set/setup'),
        meta: { title: '系统设置' }
      },
      {
        path: '/set/pay',
        component: doth => import('@/views/set/pay'),
        meta: { title: '支付设置' }
      },
      {
        path: '/set/email',
        component: email => import('@/views/set/email'),
        meta: { title: '邮箱设置' }
      },
      {
        path: '/set/sms',
        component: sms => import('@/views/set/sms'),
        meta: { title: '短信设置' }
      },
      {
        path: '/set/doth',
        component: doth => import('@/views/set/doth'),
        meta: { title: 'DotDoh设置' }
      },
      {
        path: '/set/httpdns',
        component: httpdns => import('@/views/set/httpdns'),
        meta: { title: 'HttpDNS设置' }
      },
      {
        path: '/set/fw',
        component: fw => import('@/views/set/fw'),
        meta: { title: '转发设置' }
      },
      {
        path: '/set/api',
        component: api => import('@/views/set/api'),
        meta: { title: 'api设置' }
      },
      {
        path: '/watch/warn',
        component: warn => import('@/views/watch'),
        meta: { title: '监控记录' }
      },
      {
        path: '/watch/setting',
        component: setting => import('@/views/watch/setting'),
        meta: { title: '监控列表' }
      },
      {
        path: '/watch/mon',
        component: mon => import('@/views/watch/mon'),
        meta: { title: '监控设置' }
      },
      {
        path: '/panel/list',
        component: ver => import('@/views/panel/components/vertion'),
        meta: { title: '软件版本功能介绍及说明' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
router.beforeEach((to, from, next) => {
  var win = localStorage.getItem('win')
  document.title = to.meta.title + (win || '')
  if (to.path == '/login' || to.path == '/register' || to.path == '/findpw' || to.path == "/reset" || to.path == "/regck") {
    document.title = to.meta.title
  }
  if (to.path == '/notfound') {
    document.title = ""
  }
  var token = sessionStorage.getItem('token')
  if (to.path != '/login' && to.path != '/register' && to.path != "/findpw" && to.path != "/reset" && to.path != "/regck" && to.path != "/notfound") {
    if (token) {
      next()
    }
    else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
