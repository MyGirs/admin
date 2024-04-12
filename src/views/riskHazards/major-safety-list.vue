<template>
  <div class="page">
    <ContentWrap class="mb-20">
      <el-form class="page-query" label-width="100px">
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label="风险描述">
            <el-input v-model="requestData.riskDescription"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label="验收人">
            <el-input v-model="requestData.acceptancePerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <div class="page-button">
            <el-button type="primary" @click="getResponseData">查询</el-button>
            <el-button type="success" @click="handleAdd">新增</el-button>
          </div>
        </el-col>
      </el-form>
    </ContentWrap>
    <ContentWrap title="重大安全风险清单及管控措施台账列表">
      <el-table v-loading="loading" :data="responseData.list" height="400">
        <el-table-column prop="riskDescription" min-width="120px" label="风险描述"></el-table-column>
        <el-table-column prop="riskType" min-width="120px" label="风险类型"></el-table-column>
        <el-table-column prop="riskEstimate" min-width="100px" label="风险评估"></el-table-column>
        <el-table-column prop="accidentType" min-width="100px" label="事故类型"></el-table-column>
        <el-table-column prop="controlMeasures" min-width="100px" label="管控措施"></el-table-column>
        <el-table-column prop="controlPerson" min-width="100px" label="管控责任人"></el-table-column>
        <el-table-column prop="responsiblePerson" min-width="100px" show-overflow-tooltip label="分管责任人"></el-table-column>
        <el-table-column prop="responsibilityUnit" min-width="100px" label="责任单位"></el-table-column>
        <el-table-column prop="depPerson" label="部门责任人" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="completeTime" min-width="150px" label="完成时限"></el-table-column>
        <el-table-column prop="maxWorkPerson" min-width="100px" label="作业人数上限"></el-table-column>
        <el-table-column prop="financialSecurity" min-width="100px" show-overflow-tooltip label="资金保障"></el-table-column>
        <el-table-column min-width="150px" show-overflow-tooltip label="完成情况及验收人">
          <template #default="{ row }">{{ row.completeSituation }}{{ row.acceptancePerson }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click.prevent="openDialog(row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="sizes,prev, pager, next" :total="responseData.total" :page-sizes="[10, 20, 30, 50]"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </ContentWrap>
    <majorDialog v-model="dialogVisible" :selectRow="selectRow" v-if="dialogVisible" @submit="getResponseData">
    </majorDialog>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'

import { getMeasureListApi } from './api'
import { ContentWrap } from '@/components/ContentWrap'
import majorDialog from './components/major-dialog.vue'
const loading = ref(false)
const responseData = reactive({
  list: [],
  total: 0
})
const requestData = reactive({
  pagesize: 10,
  pagenum: 1,
  acceptancePerson: '',
  riskDescription: ''
})
const handleSizeChange = (val: number) => {
  requestData.pagesize = val
  getResponseData()
}
const handleCurrentChange = (val: number) => {
  requestData.pagenum = val
  getResponseData()
}
const getResponseData = async () => {
  loading.value = true
  try {
    let res = await getMeasureListApi(requestData)
    responseData.list = res.data
    responseData.total = res.total
    loading.value = false
  } catch (error) {
    loading.value = false
    responseData.list = []
    responseData.total = 0
  }
}
const dialogVisible = ref(false)
const selectRow = ref()
const openDialog = (row) => {
  selectRow.value = row
  dialogVisible.value = true
}
const Router = useRouter()
const handleAdd = () => {
  Router.push({
    path: 'majorSafetyAdd'
  })
}

onMounted(getResponseData)
</script>
<style lang="less" scoped>
.mb-20 {
  margin-bottom: 20px;
}

.page-query {
  display: flex;
  flex-wrap: wrap;

  .el-form-item {
    margin-bottom: 10px;

    .el-input,
    .el-select {
      max-width: 300px
    }
  }

  .page-button {
    text-align: end;
  }
}

.el-table {
  min-height: 200px
}

.el-pagination {
  margin-top: 10px;
}
</style>
