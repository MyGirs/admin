
type Items = {
  type: String,
  value: String,
  label: String,
  tip: String,
  options?: Array<any>
}
export const produceStatistics: Array<Items> = [
  {
    type: 'textarea',
    value: 'morningPlan',
    label: '早班计划',
    tip: '请输入早班计划',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '早班完成情况',
    tip: '请输入早班完成情况',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '中班计划',
    tip: '请输入早班计划',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '中班完成情况',
    tip: '请输入中班完成情况',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '晚班计划',
    tip: '请输入晚班计划',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '晚班完成情况',
    tip: '请输入晚班完成情况',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '合计计划',
    tip: '请输入合计计划',
  }, {
    type: 'textarea',
    value: 'morningPlan',
    label: '合计完成情况',
    tip: '请输入合计完成情况',
  },
]