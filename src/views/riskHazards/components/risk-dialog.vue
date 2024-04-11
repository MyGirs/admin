<template>
  <el-dialog v-model="dialogVisible" title="详情" width="90%" modal-class="riskDialog">
    <el-switch v-model="isUpdate" inactive-text="是否修改">
    </el-switch>
    <el-form label-width="80" class="dialog-form">
      <el-col :xl="8" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in formItemList" :key="index">
        <el-form-item :label="item.label">
          <el-input v-if="item.type == 'input'" :readonly="!isUpdate" :placeholder="item.tip || '请输入'"
            v-model="form[item.value]"></el-input>
          <el-input type="textarea" v-if="item.type == 'textarea'" :readonly="!isUpdate" v-model="form[item.value]"
            :placeholder="item.tip || '请输入'"></el-input>

          <el-date-picker style="width: 100%" value-format="YYYY-MM-DD HH:mm:ss" type="datetime"
            v-if="item.type == 'time'" :readonly="!isUpdate" v-model="form[item.value]"
            :placeholder="item.tip || '请选择时间'" />
          <el-select v-if="item.type == 'select'" v-model="form[item.value]" :readonly="!isUpdate"
            :placeholder="item.tip || '请选择'" style="width: 100%">
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="dialog-button" v-loading="submitLoading">
      <el-button type="primary" v-if="isUpdate" @click="handleUpdate">修改</el-button>
      <el-button @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, watch } from "vue"
import { updatedRiskHazardsApi } from '../api'
import { formItemList } from "../commonField"
import { ElRow, ElCol, ElMessage } from 'element-plus'
const dialogVisible = defineModel()
const isUpdate = ref(false)
const submitLoading = ref(false)
const form = reactive({
  id: '',
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
const props = defineProps({
  selectRow: {
    type: Object
  },
})
const $emit = defineEmits(['submit', 'update:value'])
watch(() => props.selectRow, (newVal) => {
  for (var key in newVal) {
    form[key] = newVal[key]
  }
  isUpdate.value = false
}, { deep: true, immediate: true })
const handleUpdate = async () => {
  submitLoading.value = true
  try {
    let res = await updatedRiskHazardsApi(form)
    ElMessage.success('修改成功')
    submitLoading.value = false
    $emit('submit')
    handleClose()
  } catch (error) {
    submitLoading.value = false
  }

}
const handleClose = () => {
  for (var key in form) {
    form[key] = ''
  }
  dialogVisible.value = false
}
</script>
<style scoped>
.dialog-form {
  margin-top: 20px;
  max-height: 400px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}

.dialog-button {
  text-align: center;
  width: 100%;
}
</style>