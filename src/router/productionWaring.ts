import { Layout } from '@/utils/routerHelper'
export default {
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