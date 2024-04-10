<template>
  <ContentWrap :title="title">
    <el-form label-width="100">
      <!-- <el-row > -->
      <el-col :xl="10" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in produceStatistics" :key="index">
        <el-form-item :label="item.label">
          <el-input v-if="item.type == 'input'" :readonly="isReadonly" :placeholder="item.tip || '请输入'"
            v-model="submitForm[item.value]"></el-input>
          <el-input type="textarea" v-if="item.type == 'textarea'" :readonly="isReadonly" v-model="submitForm[item.value]"
            :placeholder="item.tip || '请输入'"></el-input>

          <el-date-picker style="width: 100%" v-if="item.type == 'time'" :readonly="isReadonly"
            v-model="submitForm[item.value]" type="dates" :placeholder="item.tip || '请选择时间'" />
          <el-select v-if="item.type == 'select'" v-model="submitForm[item.value]" :readonly="isReadonly"
            :placeholder="item.tip || '请选择'" style="width: 100%">
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="page-button">
      <el-button type="primary" v-if="!isReadonly" @click="handleAdd">确定</el-button>
      <el-button @click="handleBack">返回</el-button>
    </div>
  </ContentWrap>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { ElCol, ElMessage } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { addProduceStatisticApi } from "./api"
import { produceStatistics } from "./commonField"
const Router = useRouter()
const Route = useRoute()
const title = ref()
const isReadonly = ref(false)
const submitForm = reactive({
})
const handleAdd = async () => {
  let res = await addProduceStatisticApi(submitForm)
  if (res.code == 200) {
    ElMessage.success('新增成功')
    handleBack()
  }
}
const handleBack = () => {
  Router.push({
    path: '/infor/produce-statistics'
  })
}
onMounted(() => {
  const { type, formData } = Route.query
  if (type !== 'add') {
    title.value = '详情'
    isReadonly.value = true
    const data = JSON.parse(formData)
    for (var key in data) {
      submitForm[key] = data[key]
    }
  } else {
    title.value = '新增'
  }
})
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