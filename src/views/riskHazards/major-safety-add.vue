<template>
  <div class="page">
    <ContentWrap title="新增重大安全风险清单及管控措施台账">
      <el-form label-width="170">
        <el-col :xl="10" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in optionsList" :key="index">
          <el-form-item :label="item.label">
            <el-input v-if="item.type == 'input'" :placeholder="'请输入' + item.label" v-model="form[item.value]"></el-input>
            <el-input type="textarea" v-if="item.type == 'textarea'" v-model="form[item.value]"
              :placeholder="'请输入' + item.label"></el-input>
            <el-date-picker style="width: 100%;" v-if="item.type == 'time'" v-model="form[item.value]" type="datetime"
              :placeholder="item.tip || '请选择时间'" value-format="YYYY-MM-DD HH:mm:ss" />
            <el-select v-if="item.type == 'select'" v-model="form[item.value]" :placeholder="'请选择' + item.label">
              <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
            <el-input-number v-if="item.type == 'number'" :precision="item.precision" v-model="form[item.value]" />
          </el-form-item>
        </el-col>
        <div class="page-button" v-loading="submitLoading">
          <el-button type="primary" @click="handleAdd">确定</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </el-form>
    </ContentWrap>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { reactive, ref, onBeforeMount } from 'vue'

import { getMapApi, addMeasureListApi } from './api'
import { getMajorConfig } from "./commonField"
import { ContentWrap } from '@/components/ContentWrap'
const submitLoading = ref(false)
const form = ref({})
const Router = useRouter()
const handleAdd = async () => {
  submitLoading.value = true
  try {
    let res = await addMeasureListApi({ ...form.value })
    ElMessage.success('新增成功')
    handleBack()
    submitLoading.value = false
  } catch (error) {
    submitLoading.value = false
  }
}
const handleBack = () => {
  Router.push({
    path: '/riskHazards/majorSafety'
  })
}
const optionsList = ref([])
const getMap = async () => {
  const { data } = await getMapApi()
  optionsList.value = getMajorConfig(data.rectificationMap)
}
onBeforeMount(async () => {
  await getMap()
})
</script>
<style lang="less" scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
}

.el-input,
.el-select,
.el-input-number {
  width: 100% !important;
}

.page-button {
  width: 100%;
  text-align: center;

  .el-button {
    width: 100px;
  }
}
</style>
