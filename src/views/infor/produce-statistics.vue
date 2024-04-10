<template>
  <div class="search-warp">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <ContentWrap title="值班记录表">
    <el-table v-loading="loading" :data="responseData.list" height="400">
      <el-table-column prop="morningPlan" max-width="200px" show-overflow-tooltip label="早班计划"></el-table-column>
      <el-table-column prop="morningSituation" max-width="200px" show-overflow-tooltip label="早班完成情况"></el-table-column>
      <el-table-column prop="centrePlan" max-width="200px" show-overflow-tooltip label="中班计划"></el-table-column>
      <el-table-column prop="centreSituation" max-width="200px" show-overflow-tooltip label="中班完成情况"></el-table-column>
      <el-table-column prop="eveningPlan" max-width="200px" show-overflow-tooltip label="晚班计划"></el-table-column>
      <el-table-column prop="eveningSituation" max-width="200px" show-overflow-tooltip label="晚班完成情况"></el-table-column>
      <el-table-column prop="totalPlan" max-width="200px" show-overflow-tooltip label="合计计划"></el-table-column>
      <el-table-column prop="totalSituation" max-width="200px" show-overflow-tooltip label="合计完成情况"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click.prevent="goDetail(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="sizes,prev, pager, next" :total="responseData.total" :page-sizes="[10, 20, 30, 50]"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </ContentWrap>
  <AddRecord v-model="addDialog" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import AddRecord from './components/add-record.vue'
import { getProduceStatisticApi } from "./api"
const Router = useRouter()
const loading = ref(false)
const responseData = reactive({
  pagesize: 10,
  pagenum: 1,
  total: 0,
  list: []
})
const handleAdd = () => {
  Router.push({
    path: '/infor/produce-statistics-add',
    query: {
      type: 'add',
    }
  })
}
const goDetail = (row) => {
  Router.push({
    path: '/infor/produce-statistics-add',
    query: {
      type: 'detail',
      formData: JSON.stringify(row)
    }
  })
}
const handleSizeChange = (val: number) => {
  responseData.pagesize = val
  getResponseData()
}
const handleCurrentChange = (val: number) => {
  responseData.pagenum = val
  getResponseData()
}
const getResponseData = async () => {
  loading.value = true
  let res = await getProduceStatisticApi({
    pagesize: responseData.pagesize,
    pagenum: responseData.pagenum
  })
  if (res.code == 200) {
    responseData.list = res.data
    responseData.total = res.total
  }
  loading.value = false
}

onMounted(getResponseData)
</script>
<style lang="less" scoped>
.search-warp {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
