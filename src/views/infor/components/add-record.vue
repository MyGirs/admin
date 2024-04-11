<template>
  <ContentWrap :title="title">
    <el-form :model="form" label-width="100">
      <el-col :xl="10" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in formItemList" :key="index">
        <el-form-item :label="item.label">
          <el-input v-if="item.type == 'input'" :placeholder="item.tip || '请输入'" v-model="form[item.value]"
            :readonly="isDetail"></el-input>
          <el-input type="textarea" v-if="item.type == 'textarea'" v-model="form[item.value]"
            :placeholder="item.tip || '请输入'" :readonly="isDetail"></el-input>

          <el-date-picker style="width: 100%" v-if="item.type == 'time'" v-model="form[item.value]"
            value-format="YYYY-MM-DD HH:mm:ss" type="datetime" :placeholder="item.tip || '请选择时间'" :readonly="isDetail" />
        </el-form-item>
      </el-col>
      <div class="page-button" v-loading="submitLoading">
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
import { addDuty } from '../apis'
import moment from "moment"

const router = useRouter()
const route = useRoute()

let form = ref({})
const submitLoading = ref(false)
let isDetail = ref(false)
let title = ref('新增值班记录')

const formItemList = [
  {
    type: 'time',
    value: 'time',
    label: '时间',
    tip: '请选时间'
  },
  {
    type: 'input',
    value: 'weather',
    label: '天气',
    tip: '请输入天气'
  },
  {
    type: 'input',
    value: 'user',
    label: '值班领导',
    tip: '请输入值班领导'
  },
  {
    type: 'input',
    value: 'route',
    label: '路线',
    tip: '请输入路线'
  },
  {
    type: 'textarea',
    value: 'content',
    label: '内容',
    tip: '请输入内容'
  },
  {
    type: 'textarea',
    value: 'handlingMeasures',
    label: '处理措施',
    tip: '请输入处理措施'
  }
]

onBeforeMount(() => {
  let query = route.query
  if (query.type == 'detail') {
    isDetail.value = true
    title.value = "值班记录详情"
    let params = JSON.parse(query.row)
    for (var key in params) {
      form.value[key] = params[key]
    }
  } else {
    form.value.time = moment().format('YYYY-MM-DD HH:mm:ss')
  }
})

const handleAdd = async () => {
  submitLoading.value = true
  try {
    let res = await addDuty(form.value)
    if (res.code == 200) {
      ElMessage.success('新增成功')
      submitLoading.value = false
      handleBack()
    }
  } catch (error) {
    submitLoading.value = false
  }

}

const handleBack = () => {
  router.push({
    path: '/infor/duty-record'
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
