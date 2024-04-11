<template>
  <ContentWrap class="mb-20">
    <el-button type="success" @click="handleAdd">新增</el-button>
  </ContentWrap>
  <ContentWrap title="生产记录表">
    <el-table v-loading="loading" :data="responseData.list" height="400">
      <el-table-column prop="time" label="时间" min-width="150"></el-table-column>
      <el-table-column prop="classes" label="班次" min-width="150"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="150"></el-table-column>
      <el-table-column prop="dispatcher" label="调度员" min-width="150"></el-table-column>
      <el-table-column prop="produceAddress" label="生产地址" min-width="180"></el-table-column>
      <el-table-column prop="producePlan" label="生产计划" min-width="180"></el-table-column>
      <el-table-column prop="produceSituation" label="生产情况" min-width="180"></el-table-column>
      <el-table-column prop="rectificationSituation" label="安全生产隐患以及整改情况" min-width="200"></el-table-column>
      <el-table-column prop="rescue" label="事故及救援" min-width="180"></el-table-column>
      <el-table-column prop="accident" label="意外事件" min-width="180"></el-table-column>
      <el-table-column prop="safetyInstructions" label="安全指示" min-width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click.prevent="openDetail(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="responseData.pagenum" v-model:page-size="responseData.pagesize"
      layout="sizes,prev, pager, next" :total="responseData.total" :page-sizes="[10, 20, 30, 50]"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </ContentWrap>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProductList } from './apis'

const loading = ref(false)

const responseData = reactive({
  list: [],
  total: 0,
  pagesize: 10,
  pagenum: 1,
  type: 1
})

const router = useRouter()

const handleSizeChange = (val: number) => {
  responseData.pagesize = val
  getResponseData()
}
const handleCurrentChange = (val: number) => {
  responseData.pagenum = val
  getResponseData()
}

onMounted(() => {
  getResponseData()
})

const getResponseData = async () => {
  loading.value = true
  let res = await getProductList({
    pagesize: responseData.pagesize,
    pagenum: responseData.pagenum,
  })
  loading.value = false
  if (res.code == 200) {
    responseData.list = res.data
    responseData.total = res.total
  } else {
    responseData.list = []
    responseData.total = 0
  }
}


const openDetail = (row) => {
  router.push({
    path: '/infor/produce-record/add-produce-record',
    query: {
      type: 'detail',
      row: JSON.stringify(row)
    }
  })
}

const handleAdd = () => {
  router.push('/infor/produce-record/add-produce-record')
}
</script>
<style lang="less" scoped>
.mb-20 {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.el-pagination {
  margin-top: 10px;
}
</style>
