<template>
  <div class="page">
    <ContentWrap title="新增风险/隐患">
      <el-form label-width="100">
        <!-- <el-row > -->
        <el-col :xl="10" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in formItemList" :key="index">
          <el-form-item :label="item.label">
            <el-input v-if="item.type == 'input'" :placeholder="item.tip || '请输入'"
                      v-model="form[item.value]"></el-input>
            <el-input type="textarea" v-if="item.type == 'textarea'" v-model="form[item.value]"
                      :placeholder="item.tip || '请输入'"></el-input>

            <el-date-picker style="width: 100%" v-if="item.type == 'time'" v-model="form[item.value]" type="datetime"
                            :placeholder="item.tip || '请选择时间'" value-format="YYYY-MM-DD HH:mm:ss" />
            <el-select v-if="item.type == 'select'" v-model="form[item.value]" :placeholder="item.tip || '请选择'"
                       style="width: 100%">
              <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.label" />
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
import { formItemList } from "./commonField"
import { parseMinWidth } from 'element-plus/es/components/table/src/util'
import { onMounted } from 'vue'
import moment from 'moment';

const form = ref({
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
  handlingOpinions: '',
})
const Router = useRouter()
const handleAdd = async () => {
  let params = JSON.parse(JSON.stringify(form.value))
  let res = await addRiskHazardsApi({ ...params })
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
onMounted(() => {
  form.value.time = moment().format('YYYY-MM-DD HH:mm:ss')
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
