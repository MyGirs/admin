import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { NO_RESET_WHITE_LIST } from '@/constants'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/infor/duty-record',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal-center',
    name: 'Personal',
    meta: {
      title: t('router.personal'),
      hidden: true,
      canTo: true
    },
    children: [
      {
        path: 'personal-center',
        component: () => import('@/views/Personal/PersonalCenter/PersonalCenter.vue'),
        name: 'PersonalCenter',
        meta: {
          title: t('router.personalCenter'),
          hidden: true,
          canTo: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/infor',
    component: Layout,
    name: 'Infor',
    redirect: '/infor/duty-record',
    meta: {
      title: '信息化管理',
      icon: 'clarity:document-solid',
      alwaysShow: true
    },
    children: [
      {
        path: 'duty-record',
        component: () => import('@/views/infor/duty-record.vue'),
        name: 'DutyRecord',
        meta: {
          title: '值班记录表',
          noCache: true,
          affix: false
        },
        children: [
          {
            path: 'add-record',
            component: () => import('@/views/infor/components/add-record.vue'),
            name: 'AddRecord',
            meta: {
              title: '值班记录表详情',
              noCache: true,
              affix: false,
              hidden: true
            }
          }
        ]
      },
      {
        path: 'dispose-record',
        component: () => import('@/views/infor/dispose-record.vue'),
        name: 'DisposeRecord',
        meta: {
          title: '处置记录',
          noCache: true,
          affix: false
        },
        children: [
          {
            path: 'add-dispose-record',
            component: () => import('@/views/infor/components/add-dispose-record.vue'),
            name: 'AddDisposeRecord',
            meta: {
              title: '处置记录详情',
              noCache: true,
              affix: false,
              hidden: true
            }
          }
        ]
      },
      {
        path: 'produce-record',
        component: () => import('@/views/infor/produce-record.vue'),
        name: 'ProduceRecord',
        meta: {
          title: '生产记录',
          noCache: true,
          affix: false
        },
        children: [
          {
            path: 'add-produce-record',
            component: () => import('@/views/infor/components/add-produce-record.vue'),
            name: 'AddProduceRecord',
            meta: {
              title: '生产记录详情',
              noCache: true,
              affix: false,
              hidden: true
            }
          }
        ]
      },
      {
        path: 'produce-statistics',
        component: () => import('@/views/infor/produce-statistics.vue'),
        name: 'ProduceStatistics',
        meta: {
          title: '生产统计',
          noCache: true,
          affix: false
        },
        children: [
          {
            path: 'add-produce-statistics',
            component: () => import('@/views/infor/components/add-produce-statistics.vue'),
            name: 'AddProduceStatistics',
            meta: {
              title: '生产统计详情',
              noCache: true,
              affix: false,
              hidden: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/riskHazards',
    name: 'RiskHazards',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'list',
        component: () => import('@/views/riskHazards/risk-hazards-list.vue'),
        name: 'RiskHazardsList',
        meta: {
          title: '风险隐患信息化管理',
          icon: 'ep:management'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/riskHazards/risk-hazards-add.vue'),
        name: 'RiskHazardsAdd',
        meta: {
          title: '新增风险隐患信息化管理',
          noCache: true,
          hidden: true,
          noTagsView: true
        }
      }
    ]
  },
  {
    path: '/productionWaring',
    name: 'ProductionWaring',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/productionWaring/index.vue'),
        name: 'productionWaringPage',
        meta: {
          title: '产量统计预警',
          icon: 'cib:telegram-plane'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
