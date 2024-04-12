import { Layout } from '@/utils/routerHelper'
export default {
  path: '/riskHazards',
  name: 'RiskHazards',
  component: Layout,
  meta: {
    title: '风险隐患信息化管理',
    icon: 'ep:management'
  },
  children: [
    {
      path: 'majorSafety',
      component: () => import('@/views/riskHazards/major-safety-list.vue'),
      name: 'MajorSafety',
      meta: {
        title: '重大安全风险清单及管控措施台账'
      }
    },
    {
      path: 'majorSafetyAdd',
      component: () => import('@/views/riskHazards/major-safety-add.vue'),
      name: 'MajorSafetyAdd',
      meta: {
        title: '新增',
        noCache: true,
        hidden: true,
        noTagsView: true
      }
    },
    {
      path: 'accidentAdminister',
      component: () => import('@/views/riskHazards/accident-administer-list.vue'),
      name: 'AccidentAdminister',
      meta: {
        title: '事故隐患排查治理台账'
      }
    },
    {
      path: 'accidentAdministerAdd',
      component: () => import('@/views/riskHazards/accident-administer-add.vue'),
      name: 'AccidentAdministerAdd',
      meta: {
        title: '新增',
        noCache: true,
        hidden: true,
        noTagsView: true
      }
    }
  ]
}