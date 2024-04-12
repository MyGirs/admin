import { Layout } from '@/utils/routerHelper'
export default {
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
        title: '应急值守值班记录表',
        noCache: true,
        affix: false
      },
      children: [
        {
          path: 'add-record',
          component: () => import('@/views/infor/components/add-record.vue'),
          name: 'AddRecord',
          meta: {
            title: '应急值守值班记录表详情',
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
        title: '突发险情事故处置记录',
        noCache: true,
        affix: false
      },
      children: [
        {
          path: 'add-dispose-record',
          component: () => import('@/views/infor/components/add-dispose-record.vue'),
          name: 'AddDisposeRecord',
          meta: {
            title: '突发险情事故处置记录详情',
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
        title: '安全生产记录',
        noCache: true,
        affix: false
      },
      children: [
        {
          path: 'add-produce-record',
          component: () => import('@/views/infor/components/add-produce-record.vue'),
          name: 'AddProduceRecord',
          meta: {
            title: '安全生产记录详情',
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
        title: '安全生产统计台账',
        noCache: true,
        affix: false
      },
      children: [
        {
          path: 'add-produce-statistics',
          component: () => import('@/views/infor/components/add-produce-statistics.vue'),
          name: 'AddProduceStatistics',
          meta: {
            title: '安全生产统计台账详情',
            noCache: true,
            affix: false,
            hidden: true
          }
        }
      ]
    }
  ]
}