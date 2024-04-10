<template>
  <ContentWrap class="mb-20">
    <el-button type="success" @click="handleAdd">新增</el-button>
  </ContentWrap>
  <ContentWrap title="值班记录表">
    <el-table v-loading="loading" :data="responseData.list" height="400">
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="weather" label="天气"></el-table-column>
      <el-table-column prop="user" label="值班领导"></el-table-column>
      <el-table-column prop="route" label="路线"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="handlingMeasures" label="处理措施"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click.prevent="openDetail(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="responseData.pagenum"
      v-model:page-size="responseData.pagesize"
      layout="sizes,prev, pager, next"
      :total="responseData.total"
      :page-sizes="[10, 20, 30, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </ContentWrap>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

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

const getResponseData = async () => {
  // let res = await getRiskHazardsApi({
  //   pagesize: responseData.pagesize,
  //   pagenum: responseData.pagenum,
  //   type: responseData.type
  // })
  // if (res.code == 200) {
  //   responseData.list = res.data
  //   responseData.total = res.total
  // } else {
  //   responseData.list = []
  //   responseData.total = 0
  // }
}

const openDetail = (row) => {
  console.log(row)
}

const handleAdd = () => {
  router.push('/infor/duty-record/add-record')
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
