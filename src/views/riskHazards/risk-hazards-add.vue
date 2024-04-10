<template>
  <div class="page">
    <ContentWrap title="新增风险/隐患">
      <el-form label-width="100">
        <!-- <el-row > -->
        <el-col
          :xl="8"
          :lg="10"
          :md="12"
          :sm="12"
          :xs="24"
          v-for="(item, index) in formItemList"
          :key="index"
        >
          <el-form-item :label="item.label">
            <el-input
              v-if="item.type == 'input'"
              :placeholder="item.tip || '请输入'"
              v-model="form[item.value]"
            ></el-input>
            <el-input
              type="textarea"
              v-if="item.type == 'textarea'"
              v-model="form[item.value]"
              :placeholder="item.tip || '请输入'"
            ></el-input>

            <el-date-picker
              style="width: 100%"
              v-if="item.type == 'time'"
              v-model="form[item.value]"
              type="dates"
              :placeholder="item.tip || '请选择时间'"
            />
            <el-select
              v-if="item.type == 'select'"
              v-model="form[item.value]"
              :placeholder="item.tip || '请选择'"
              style="width: 100%"
            >
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <div class="page-button">
          <el-button type="primary" @click="handleAdd">确定</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
        <!-- </el-row> -->
      </el-form>
    </ContentWrap>
  </div>
</template>
<script setup>
import { ContentWrap } from '@/components/ContentWrap'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addRiskHazardsApi } from './api'
const formItemList = [
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
const form = reactive({
  points: '',
  position: '',
  time: '',
  type: '',
  status: '',
  deviceNum: '',
  deviceModel: '',
  versionNum: '',
  content: '',
  grade: '',
  head: '',
  handlingOpinions: ''
})
const Router = useRouter()
const handleAdd = async () => {
  let res = await addRiskHazardsApi(form)
  if (res.code == 200) {
    ElMessage.success('新增成功')
    handleBack()
  }
}
const handleBack = () => {
  Router.push({
    path: '/riskHazards/list'
  })
}
</script>
<style lang="less" scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
}
.page-button {
  width: 100%;
  text-align: center;
  .el-button {
    width: 100px;
  }
}
</style>
