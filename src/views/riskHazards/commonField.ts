import { Console } from "console"

type formItems = {
  type: String
  value: String
  label: String
  tip?: String
  options?: Array<any>
  precision?: Number
}
export const types = [
  {
    label: '处理中',
    value: '处理中'
  },
  {
    label: '已完成',
    value: '已完成'
  }
]
export const gradeList = [{
  label: 'A',
  value: 'A'
}, {
  label: 'B',
  value: 'B'
}, {
  label: 'C',
  value: 'C'
}, {
  label: 'D',
  value: 'D'
}]
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
    label: '时间',
    tip: '请选择时间'
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

export const getMajorConfig = (list): Array<formItems> => {
  return [
    {
      type: 'input',
      value: 'riskDescription',
      label: '风险描述',
    }, {
      type: 'input',
      value: 'riskType',
      label: '风险类型',
    }, {
      type: 'input',
      value: 'riskEstimate',
      label: '风险评估',
    }, {
      type: 'input',
      value: 'accidentType',
      label: '事故类型',
    }, {
      type: 'input',
      value: 'controlMeasures',
      label: '管控措施',
    }, {
      type: 'input',
      value: 'controlPerson',
      label: '管控责任人',
    }, {
      type: 'input',
      value: 'responsiblePerson',
      label: '分管责任人',
    }, {
      type: 'select',
      value: 'responsibilityUnit',
      label: '责任单位',
      options: list
    }, {
      type: 'input',
      value: 'depPerson',
      label: '部门责任人',
    }, {
      type: 'time',
      value: 'completeTime',
      label: '完成时限',
    }, {
      type: 'number',
      value: 'maxWorkPerson',
      label: '作业人数上限',
      precision: 0,
    }, {
      type: 'number',
      value: 'financialSecurity',
      label: '资金保障',
    }, {
      type: 'textarea',
      value: 'completeSituation',
      label: '完成情况',
      options: types
    }, {
      type: 'input',
      value: 'acceptancePerson',
      label: '验收人',
    },
  ]
}
//事故隐患排查治理台账
export const getAccidentConfig = (list): Array<formItems> => {
  return [
    {
      type: 'input',
      value: 'problem',
      label: '检查地点存在问题及隐患',
      tip: '请输入检查地点存在问题及隐患',
    }, {
      type: 'select',
      value: 'grade',
      label: '隐患等级',
      tip: '请选择隐患等级',
      options: gradeList
    }, {
      type: 'input',
      value: 'type',
      label: '隐患类型',
      tip: '请输入隐患类型',
    }, {
      type: 'time',
      value: 'inspectTime',
      label: '排查日期',
      tip: '请选择排查日期',
    }, {
      type: 'input',
      value: 'inspectUser',
      label: '排查人员',
      tip: '请输入排查人员',
    }, {
      type: 'textarea',
      value: 'rectificationMeasures',
      label: '整改措施',
      tip: '请输入整改措施',
    }, {
      type: 'time',
      value: 'rectificationTime',
      label: '整改时限',
      tip: '请输入整改时限',
    }, {
      type: 'number',
      value: 'rectificationMoney',
      label: '整改金钱',
      tip: '请输入整改金钱',
    }, {
      type: 'select',
      value: 'rectificationUnit',
      label: '整改单位',
      tip: '请选择整改单位',
      options: list
    }, {
      type: 'input',
      value: 'rectificationPeople',
      label: '整改责任人',
      tip: '请输入整改责任人',
    }, {
      type: 'select',
      value: 'completeSituation',
      label: '完成情况',
      tip: '请输入完成情况',
      options: types
    }, {
      type: 'input',
      value: 'acceptancePerson',
      label: '验收人',
      tip: '请输入验收人',
    }, {
      type: 'select',
      value: 'supervisionUnit',
      label: '督办单位',
      tip: '请选择',
      options: list
    }, {
      type: 'input',
      value: 'supervisionPerson',
      label: '督办人员',
      tip: '请输入督办人员',
    }, {
      type: 'time',
      value: 'cancelTime',
      label: '销号日期',
      tip: '请选择销号日期',
    }
  ]
}

