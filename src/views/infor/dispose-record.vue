<template>
  <ContentWrap class="mb-20">
    <el-button type="success" @click="handleAdd">新增</el-button>
  </ContentWrap>
  <ContentWrap title="处置记录表">
    <el-table v-loading="loading" :data="responseData.list" height="400">
      <el-table-column prop="type" label="主题或类型" min-width="150"></el-table-column>
      <el-table-column prop="dep" label="部门" min-width="150"></el-table-column>
      <el-table-column prop="time" label="时间" min-width="150"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="180"></el-table-column>
      <el-table-column prop="party" label="当事人" min-width="150"></el-table-column>
      <el-table-column prop="recordInfor" label="记录或详情" min-width="180"></el-table-column>
      <el-table-column prop="opinion" label="处理意见" min-width="180"></el-table-column>
      <el-table-column prop="mark" label="备注" min-width="180"></el-table-column>
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
import { getDisposeList } from './apis'

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
  let res = await getDisposeList({
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
    path: '/infor/dispose-record/add-dispose-record',
    query: {
      type: 'detail',
      row: JSON.stringify(row)
    }
  })
}

const handleAdd = () => {
  router.push('/infor/dispose-record/add-dispose-record')
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
