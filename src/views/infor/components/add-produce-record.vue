<template>
  <ContentWrap title="新增生产记录">
    <el-form :model="form" label-width="100">
      <el-col :xl="8" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in formItemList" :key="index">
        <el-form-item :label="item.label">
          <el-input v-if="item.type == 'input'" :readonly="isDetail" :placeholder="item.tip || '请输入'"
            v-model="form[item.value]"></el-input>
          <el-input type="textarea" v-if="item.type == 'textarea'" :readonly="isDetail" v-model="form[item.value]"
            :placeholder="item.tip || '请输入'"></el-input>

          <el-date-picker style="width: 100%" v-if="item.type == 'time'" :readonly="isDetail" v-model="form[item.value]"
            type="dates" :placeholder="item.tip || '请选择时间'" />

          <el-select v-if="item.type == 'select'" v-model="form[item.value]" :placeholder="item.tip || '请选择'"
            style="width: 100%">
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <div class="page-button">
        <el-button type="primary" @click="handleAdd" v-if="!isDetail">确定</el-button>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </ContentWrap>
</template>
<script setup>
import { ElButton, ElForm, ElInput, ElFormItem, ElDatePicker, ElMessage } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addProduct } from '../apis'

const router = useRouter()
const route = useRoute()

let isDetail = ref(false)
let form = ref({
  time: '',
  classes: '',
  address: '',
  dispatcher: '',
  produceAddress: '',
  producePlan: '',
  produceSituation: '',
  rectificationSituation: '',
  rescue: '',
  accident: '',
  safetyInstructions: ''
})
const formItemList = [
  {
    type: 'time',
    value: 'time',
    label: '时间',
    tip: '请选时间'
  },
  {
    type: 'select',
    value: 'classes',
    label: '班次',
    tip: '请选择班次',
    options: [
      {
        value: '1',
        label: '早班'
      },
      {
        value: '2',
        label: '中班'
      },
      {
        value: '3',
        label: '夜班'
      }
    ]
  },
  {
    type: 'textarea',
    value: 'address',
    label: '地址',
    tip: '请输入地址'
  },

  {
    type: 'input',
    value: 'dispatcher',
    label: '调度员',
    tip: '请输入调度员'
  },
  {
    type: 'textarea',
    value: 'produceAddress',
    label: '生产地址',
    tip: '请输入生产地址'
  },
  {
    type: 'textarea',
    value: 'producePlan',
    label: '生产计划',
    tip: '请输入生产计划'
  },
  {
    type: 'textarea',
    value: 'produceSituation',
    label: '生产情况',
    tip: '请输入生产情况'
  },
  {
    type: 'textarea',
    value: 'rectificationSituation',
    label: '安全生产隐患以及整改情况',
    tip: '请输入安全生产隐患以及整改情况'
  },
  {
    type: 'textarea',
    value: 'rescue',
    label: '事故及救援',
    tip: '请输入事故及救援'
  },
  {
    type: 'textarea',
    value: 'accident',
    label: '意外事件',
    tip: '请输入意外事件'
  },
  {
    type: 'textarea',
    value: 'safetyInstructions',
    label: '安全指示',
    tip: '请输入安全指示'
  }
]

onBeforeMount(() => {
  let query = route.query
  if (query) {
    isDetail.value = true
  }
})

const handleAdd = async () => {
  let res = await addProduct(form)
  if (res.code == 200) {
    ElMessage.success('新增成功')
    handleBack()
  }
}

const handleBack = () => {
  router.push({
    path: '/infor/produce-record'
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
