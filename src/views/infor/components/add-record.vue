<template>
  <el-dialog v-model="addDialog" title="新增" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="时间">
        <el-date-picker v-model="form.time" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="天气">
        <el-input v-model="form.weather" />
      </el-form-item>
      <el-form-item label="值班领导">
        <el-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="路线">
        <el-input v-model="form.route" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="处理措施">
        <el-input v-model="form.handlingMeasures" type="textarea" :rows="2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElButton, ElDialog, ElForm, ElInput, ElFormItem, ElDatePicker } from 'element-plus'
import { ref } from 'vue'
const addDialog = defineModel()

const form = ref({
  name: null
})
</script>

<style lang="less" scoped></style>
