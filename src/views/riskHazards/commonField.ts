type formItems = {
  type: String,
  value: String,
  label: String,
  tip: String,
  options?: Array<any>
}
export const formItemList: Array<formItems> = [
  {
    type: 'input',
    value: 'points',
    label: '监测点位',
    tip: '请选择风险/隐患监测点位'
  },
  {
    type: 'input',
    value: 'position',
    label: '位置',
    tip: '请选择风险/隐患设备位置'
  },
  {
    type: 'time',
    value: 'time',
    label: '时间'
  },
  {
    type: 'select',
    value: 'type',
    label: '类型',
    tip: '请选择风险/隐患设备类型',
    options: [
      {
        label: '风险',
        value: 1
      },
      {
        label: '隐患',
        value: 2
      }
    ]
  },
  {
    type: 'input',
    value: 'status',
    label: '状态',
    tip: '请选择风险/隐患设备状态'
  },
  {
    type: 'input',
    value: 'deviceNum',
    label: '设备编号',
    tip: '请输入风险/隐患设备型号'
  },
  {
    type: 'input',
    value: 'deviceModel',
    label: '设备型号',
    tip: '请输入风险/隐患设备型号'
  },
  {
    type: 'input',
    value: 'versionNum',
    label: '版本编号',
    tip: '请输入风险/隐患版本编号'
  },
  {
    type: 'textarea',
    value: 'content',
    label: '内容',
    tip: '请输入风险/隐患内容'
  },
  {
    type: 'input',
    value: 'grade',
    label: '等级',
    tip: '请输入风险/隐患等级'
  },
  {
    type: 'input',
    value: 'head',
    label: '负责人',
    tip: '请输入负责人'
  },
  {
    type: 'textarea',
    value: 'handlingOpinions',
    label: '处理意见',
    tip: '请输入处理意见'
  }
]